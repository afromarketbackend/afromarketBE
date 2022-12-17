const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.singleDisputeSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.createDisputeSchema = Joi.object().keys({
    reason: Joi.string().required(),
    description: Joi.string().optional()
})
