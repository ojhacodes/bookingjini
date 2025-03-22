const Post = require('../models/Post');
const { generateImage } = require('../services/canvaService');
const { publishToSocialMedia } = require('../services/socialMediaService');

exports.createPost = async (req, res) => {
    try {
        const { title, occasion, content, platforms, scheduledFor } = req.body;

        // Generate image using Canva API
        const imageUrl = await generateImage({
            occasion,
            content,
            brandKit: req.user.brandKit
        });

        const post = new Post({
            user: req.user.id,
            title,
            occasion,
            content: {
                ...content,
                imageUrl
            },
            platforms: platforms.map(platform => ({
                name: platform,
                status: 'pending'
            })),
            scheduledFor
        });

        await post.save();

        res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating post',
            error: error.message
        });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching posts',
            error: error.message
        });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching post',
            error: error.message
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content, platforms, scheduledFor } = req.body;
        const post = await Post.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        if (title) post.title = title;
        if (content) post.content = content;
        if (platforms) post.platforms = platforms;
        if (scheduledFor) post.scheduledFor = scheduledFor;

        await post.save();

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating post',
            error: error.message
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting post',
            error: error.message
        });
    }
};

exports.publishPost = async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Publish to selected social media platforms
        const results = await publishToSocialMedia(post, req.user);

        // Update post status and platform statuses
        post.status = 'published';
        post.publishedAt = new Date();
        post.platforms = post.platforms.map(platform => {
            const result = results[platform.name];
            return {
                ...platform,
                status: result.success ? 'published' : 'failed',
                postId: result.postId,
                publishedAt: result.success ? new Date() : undefined,
                error: result.error
            };
        });

        await post.save();

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error publishing post',
            error: error.message
        });
    }
}; 