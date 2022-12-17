const cloudinary = require('cloudinary').v2
const KEYS = require('./keys')

cloudinary.config({
    cloud_name: KEYS.cloudinaryName,
    api_key: KEYS.cloudinaryApiKey,
    api_secret: KEYS.cloudinaryApiSecret
})

module.exports = cloudinary