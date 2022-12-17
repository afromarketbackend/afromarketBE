const path = require('path');
const fs = require('fs');
const axios = require("axios");
const AWS = require('aws-sdk');
const FileType = require('file-type')

const nodeHtmlToImage = require('node-html-to-image');
const KEYS = require("../config/keys");
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");

exports.generateThumbnail = async (req, _, next) => {
    console.log("=============== generating thumbnail with icon ===========");

    let file = req.file;
    const thumbnailData = fs.readFileSync(path.join(__dirname, `../../upload/${file.filename}`));
    // const iconData = fs.readFileSync(path.join(__dirname, `../../upload/video_icon.png`));

    // const response = await axios.get("https://admoni-test.s3.eu-west-2.amazonaws.com/video_icon.png", { responseType: 'arraybuffer' })
    const iconBuffer = await axios.get(process.env.ICON_URL, { responseType: 'arraybuffer' })
    // const iconBuffer = Buffer.from(response.data, "utf-8")

    console.log("======= Read image and thumbnail from folder =======");
    const base64Image = new Buffer.from(thumbnailData).toString('base64');
    const base64Icon = new Buffer.from(iconBuffer.data).toString('base64');
    // const base64Icon = new Buffer.from(iconData).toString('base64');

    const thumbnail = `data:${file.mimetype};base64,${base64Image}`
    const icon = `data:image/png;base64,${base64Icon}`

    await nodeHtmlToImage({
        puppeteerArgs: {
            args: ['--no-sandbox']
        },
        output: path.join(__dirname, `../../upload/image.png`),
        html: `
    <html lang="en">
    <head>
        <style>
        body {
            width: 400px;
            height: 256px;
            }
            .container{
                width: 240px;
                height: 350px;
            }
            #background{
                width: 400px;
                height: 256px;
            }
            #icon{
                position: absolute;
                top: 98px;
                left: 170px;
                opacity: 1;
                width: 80px;
                height: 80px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img id="background" src="{{thumbnail}}" alt="Advert thumbnail">
            <img id="icon" src="{{icon}}" alt="Advert video play icon">
        
        </div>
    </body>
    </html> 
        `,
        content: { thumbnail, icon }
    });

    fs.unlinkSync(path.join(__dirname, `../../upload/${file.filename}`))

    // Read the generated image from disk
    const imageData = fs.readFileSync(path.join(__dirname, `../../upload/image.png`))

    const base64ThumbnailWithIcon = Buffer.from(imageData).toString('base64');

    const {location, key} = await imageUpload(base64ThumbnailWithIcon, req.params.id);
    console.log("==== thumbnail generated successfully ==========");
    fs.unlinkSync(path.join(__dirname, `../../upload/image.png`))

    req.files = [{ location, key }];

    console.log("icon generating middleware done")

    next();
};


/**
 *
 * @param  {string}  base64 Data
 * @return {Object}  Image url, and key
 */

const imageUpload = async (base64, id) => {

    const { S3_ID, S3_SECRET, AWS_REGION, S3_BUCKET } = process.env

    AWS.config.setPromisesDependency(require('bluebird'));
    AWS.config.update({ accessKeyId: S3_ID, secretAccessKey: S3_SECRET, region: AWS_REGION });

    const s3 = new AWS.S3();

    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // Getting the file type, ie: jpeg, png or gif
    const { ext: type } = await FileType.fromBuffer(Buffer.from(base64, 'base64'));

    const params = {
        Bucket: S3_BUCKET,
        Key: `${id}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    }

    let location = '';
    let key = '';
    try {
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
    } catch (error) {
        console.log(error)
    }

    console.log("======== location =====", location, "key::", key);

    return {location, key};
}