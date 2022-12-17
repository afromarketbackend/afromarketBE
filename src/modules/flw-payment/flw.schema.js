const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.createPayMentSchema = Joi.object().keys({
    tx_ref: Joi.string().required(),
    amount: Joi.number().required(),
    redirect_url: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    order_id: Joi.string().required(),
    tracking_id: Joi.string().required(),

})

exports.confirmPayMentSchema = Joi.object().keys({
    tx_ref: Joi.string().required(),
    status: Joi.string().required(),
    transaction_id: Joi.string().required(),
})

exports.singleModelSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.fundWalletSchema = Joi.object().keys({
    amount: Joi.number().required(),
})