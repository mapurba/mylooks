const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');


const blogPhotos = new mongoose.Schema({
    caption: {
        type: String,
        required: false
    },
    user:{type:Object,required:true},
    _id: {type: String, required: true},
    facebookId: {type: String, required: true},
    like_count: {type: Number},
    media_type: {type: String, required: false},
    media_url: {
        type: String,
        required: true,
        default: ''
    },
    productLink:{type:Object,require:true},
    permalink: {type: String, required: true, default: ''},
    username: {type: String, required: false},
}, {timestamps: true});


/**
 * Helper method for getting user's gravatar.
 */


const BlogPhotos = mongoose.model('BlogPhotos', BlogPhotos);

module.exports = BlogPhotos;
