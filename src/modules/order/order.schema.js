const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.createOrderSchema = Joi.object().keys({
    order_tray: Joi.array().items(Joi.object()).required(),
    delivery_address: Joi.string().optional(),
    customer_contact: Joi.string().required()

})

exports.cancelOrderSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.singleOrderSchema = Joi.object().keys({
    id: Joi.string().required(),
})


exports.trackOrderSchema = Joi.object().keys({
    tracking_id: Joi.string().required(),
})


exports.filterSchema = Joi.object().keys({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    status: Joi.string().optional(),
})

    