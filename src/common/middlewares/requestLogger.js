const axios = require("axios");
const KEYS = require("../config/keys");

exports.requestLogger = async (req, res, next) => {
  if (!req.query.platform) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: "Please specify a platform",
      data: null,
    });
  }

  if (!["web", "android", "ios"].includes(req.query.platform)) {
    return res.status(422).json({
      code: 422,
      status: "error",
      message: "Platform can only be one of web, android and ios",
      data: null,
    });
  }
  try {
    await axios.post(`${KEYS.requestLogger}/logger/create`, {
      url: req.protocol + "://" + req.get("host") + "/" + req.path,
      user_id: req.userId || undefined,
      platform: req.query.platform,
      method: req.method,
      service: "advert",
    });

    next();
  } catch (err) {
    console.log(err.response || err);
    next();
  }
};
