const cloudinary = require('../config/cloudinary')
exports.fileUploader = async (file) =>{
    const {url, secure_url} = await cloudinary.uploader.upload(file)
    return secure_url
}

