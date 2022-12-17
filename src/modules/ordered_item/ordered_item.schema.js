const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.singleItemSchema = Joi.object().keys({
    id: Joi.string().required(),
    item_id: Joi.string().required()
})

exports.cancelOrderSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.singleOrderSchema = Joi.object().keys({
    id: Joi.string().required(),
})
