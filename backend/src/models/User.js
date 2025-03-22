const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    hotelName: {
        type: String,
        required: true,
        trim: true
    },
    brandKit: {
        colors: [String],
        fonts: [String],
        logo: String
    },
    socialMediaAccounts: {
        facebook: {
            accessToken: String,
            pageId: String
        },
        instagram: {
            accessToken: String,
            businessAccountId: String
        },
        twitter: {
            accessToken: String,
            accessTokenSecret: String
        },
        linkedin: {
            accessToken: String,
            companyId: String
        }
    },
    canvaRefreshToken: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User; 