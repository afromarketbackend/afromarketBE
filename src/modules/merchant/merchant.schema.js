const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.registerMerchantSchema = Joi.object().keys({
    business_name: Joi.string().required(),
    business_description: Joi.string().required(),
    business_type: Joi.string()
        .valid(
            'public limited company', 
            'private limited company'
        )
        .optional(),
    tax_id_number: Joi.number().optional(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().optional(),
    bank_name: Joi.string().optional(),
    account_name: Joi.string().optional(),
    account_number: Joi.string().optional(),
    bank_verification_number: Joi.number().optional(),
})

exports.loginMerchantSchema = Joi.object().keys({
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

exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
});