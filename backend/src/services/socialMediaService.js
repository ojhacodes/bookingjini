const axios = require('axios');

// Facebook Graph API
const FACEBOOK_API_URL = 'https://graph.facebook.com/v18.0';

exports.publishToFacebook = async (accessToken, post) => {
    try {
        const response = await axios.post(
            `${FACEBOOK_API_URL}/me/feed`,
            {
                message: post.content,
                link: post.imageUrl,
                scheduled_publish_time: Math.floor(new Date(post.scheduledTime).getTime() / 1000)
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return {
            success: true,
            postId: response.data.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error?.message || 'Failed to publish to Facebook'
        };
    }
};

// Instagram Graph API
const INSTAGRAM_API_URL = 'https://graph.facebook.com/v18.0';

exports.publishToInstagram = async (accessToken, post) => {
    try {
        // First, create a container
        const containerResponse = await axios.post(
            `${INSTAGRAM_API_URL}/me/media`,
            {
                image_url: post.imageUrl,
                caption: post.content,
                access_token: accessToken
            }
        );

        // Then publish the container
        const publishResponse = await axios.post(
            `${INSTAGRAM_API_URL}/me/media_publish`,
            {
                creation_id: containerResponse.data.id,
                access_token: accessToken
            }
        );

        return {
            success: true,
            postId: publishResponse.data.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error?.message || 'Failed to publish to Instagram'
        };
    }
};

// Twitter API v2
const TWITTER_API_URL = 'https://api.twitter.com/2';

exports.publishToTwitter = async (accessToken, post) => {
    try {
        // First, upload the media
        const mediaResponse = await axios.post(
            `${TWITTER_API_URL}/tweets`,
            {
                text: post.content,
                media: {
                    media_ids: [post.imageUrl]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return {
            success: true,
            postId: mediaResponse.data.data.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error?.message || 'Failed to publish to Twitter'
        };
    }
};

// LinkedIn API
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';

exports.publishToLinkedIn = async (accessToken, post) => {
    try {
        const response = await axios.post(
            `${LINKEDIN_API_URL}/ugcPosts`,
            {
                author: `urn:li:person:${post.userId}`,
                lifecycleState: 'DRAFT',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: post.content
                        },
                        shareMediaCategory: 'IMAGE',
                        media: [
                            {
                                status: 'READY',
                                originalUrl: post.imageUrl
                            }
                        ]
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-Restli-Protocol-Version': '2.0.0'
                }
            }
        );

        return {
            success: true,
            postId: response.data.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error?.message || 'Failed to publish to LinkedIn'
        };
    }
}; 