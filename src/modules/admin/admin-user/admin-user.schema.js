const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.registerAdminSchema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().trim().valid("super", "admin").optional(),
})

exports.loginAdminSchema = Joi.object().keys({
    email: Joi.string().trim().optional().label("email"),
    password: Joi.string().when("auth_type", {
        not: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    auth_type: Joi.string().valid("gg", "fb", "ap").optional(),
   
})
     .xor("email", "phone_number")
    .label("field");

exports.forgotPasswordSchema = Joi.object().keys({
    email: Joi.string().required()
})

exports.resetPasswordSchema = Joi.object().keys({
    newPassword: Joi.string().required(),
    otp: Joi.string().required()
})