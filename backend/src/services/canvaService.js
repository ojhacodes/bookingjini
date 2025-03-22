const axios = require('axios');

const CANVA_API_URL = 'https://api.canva.com/v1';

const getAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${CANVA_API_URL}/oauth/token`, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.CANVA_API_KEY,
            client_secret: process.env.CANVA_API_SECRET
        });

        return response.data.access_token;
    } catch (error) {
        throw new Error('Failed to refresh Canva access token');
    }
};

exports.generateImage = async ({ occasion, content, brandKit }) => {
    try {
        // Get access token
        const accessToken = await getAccessToken(process.env.CANVA_REFRESH_TOKEN);

        // Create a new design
        const designResponse = await axios.post(
            `${CANVA_API_URL}/designs`,
            {
                template_id: getTemplateId(occasion),
                brand_kit: brandKit,
                content: {
                    text: content.text,
                    images: content.images || []
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Get the design URL
        const designUrl = designResponse.data.design_url;

        // Export the design as an image
        const exportResponse = await axios.post(
            `${CANVA_API_URL}/designs/${designResponse.data.id}/export`,
            {
                format: 'png',
                quality: 'high'
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return exportResponse.data.url;
    } catch (error) {
        throw new Error('Failed to generate image with Canva');
    }
};

exports.getDesignEditorUrl = async (designId, user) => {
    try {
        const accessToken = await getAccessToken(user.canvaRefreshToken);

        const response = await axios.post(
            `${CANVA_API_URL}/designs/${designId}/editor-url`,
            {
                user_id: user.id,
                expires_in: 3600 // 1 hour
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.editor_url;
    } catch (error) {
        throw new Error('Failed to get Canva editor URL');
    }
};

const getTemplateId = (occasion) => {
    // Map occasions to Canva template IDs
    const templateMap = {
        'independence-day': 'template_id_1',
        'diwali': 'template_id_2',
        'womens-day': 'template_id_3',
        // Add more template mappings as needed
    };

    return templateMap[occasion.toLowerCase()] || 'default_template_id';
}; 