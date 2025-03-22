const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    occasion: {
        type: String,
        required: true,
        enum: ['independence-day', 'diwali', 'womens-day', 'other']
    },
    content: {
        text: {
            type: String,
            required: true
        },
        images: [String]
    },
    platforms: [{
        type: String,
        enum: ['facebook', 'instagram', 'twitter', 'linkedin']
    }],
    imageUrl: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'scheduled', 'published', 'failed'],
        default: 'draft'
    },
    platformStatus: {
        facebook: {
            status: String,
            postId: String,
            error: String
        },
        instagram: {
            status: String,
            postId: String,
            error: String
        },
        twitter: {
            status: String,
            postId: String,
            error: String
        },
        linkedin: {
            status: String,
            postId: String,
            error: String
        }
    },
    analytics: {
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        reach: { type: Number, default: 0 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 