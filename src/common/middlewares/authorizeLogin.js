let validator = require("email-validator");
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const models = require("../../db/models");
const { Op, QueryTypes } = require("sequelize");
const {User, Merchant, Admin} = models

exports.authorizeLogin = async (req, _, next) => {
  let email = String(req.body.email).toLowerCase();
  try {

     
    var user = await User.findOne({
        where: { email: email},    
    });
    if (!user) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `User does not Exist`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }else {
      req.user = user;
      return next();
    }
   
   } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};

exports.authMerchLogin = async (req, _, next) => {
  let email = String(req.body.email).toLowerCase();
  try {
    var merchant = await Merchant.findOne({
        where: { email: email},    
    });
    if (!merchant) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `Merchant does not Exist`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }else {
      req.user = merchant;
      console.log(merchant)
      return next();
    }
   
   } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};


exports.authAdminLogin = async (req, _, next) => {
  let email = String(req.body.email).toLowerCase();
  try {
    var admin = await Admin.findOne({
        where: { email: email},    
    });
    if (!admin) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `Admin does not Exist`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }else {
      req.user = admin;
      console.log(admin)
      return next();
    }
   
   } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};