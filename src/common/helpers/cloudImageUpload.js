const cloudinary = require('../config/cloudinary')
exports.fileUploader = async (file) =>{
    const {url} = await cloudinary.uploader.upload(file)
    return url
}

