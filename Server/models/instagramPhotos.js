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
        default: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/28428140_197596014306650_8646541114205011968_n.jpg?_nc_cat=0&oh=57649c6c9777fc4d20b6eea129f489e0&oe=5B9F9B81'
    },
    permalink: {type: String, required: true, default: 'https://www.instagram.com/p/BgDo4BDlmFw/'},
    username: {type: String, required: false},
}, {timestamps: true});


/**
 * Helper method for getting user's gravatar.
 */


const InstagramPhotos = mongoose.model('InstagramPhotos', instagramPhotos);

module.exports = InstagramPhotos;
