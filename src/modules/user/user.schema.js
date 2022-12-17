const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.registerUserSchema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

exports.loginUserSchema = Joi.object().keys({
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

exports.changePasswordSchema = Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),

})