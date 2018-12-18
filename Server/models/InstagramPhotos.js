const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const instagramPhotos = new mongoose.Schema({
    caption: {
        type: String,
        required: false
    },
    _id: {type: String, required: true},
    facebookId: {type: String, required: true},
    like_count: {type: Number},
    media_type: {type: String, required: false},
    media_url: {
        type: String,
        required: true,
        default: ''
    },
    permalink: {type: String, required: true, default: ''},
    username: {type: String, required: false},
}, {timestamps: true});


/**
 * Helper method for getting user's gravatar.
 */


const InstagramPhotos = mongoose.model('InstagramPhotos', instagramPhotos);

module.exports = InstagramPhotos;
