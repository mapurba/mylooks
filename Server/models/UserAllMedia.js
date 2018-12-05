const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userAllMedia = new mongoose.Schema({

    facebookId: {
        type: String,
        required: true
    },
    media_url: {
        type: String,
        required: true
    },
    sendForReview: {
        type: Boolean,
        default: false
    },
    permalink: {
        type: String,
        required: true
    },
    like_count: {
        type: Number,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true
});


/**
 * Helper method for getting user's gravatar.
 */


const UserAllMedia = mongoose.model('UserAllMedia', userAllMedia);

module.exports = UserAllMedia;