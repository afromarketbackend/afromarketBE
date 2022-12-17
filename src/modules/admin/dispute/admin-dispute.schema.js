const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);


exports.getAlldisputesSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.singleDisputeSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.searchSchema = Joi.object().keys({
    search: Joi.string().required(),
})
exports.filterSchema = Joi.object().keys({
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
})

exports.awardDisputeSchema = Joi.object().keys({
    status: Joi.string().required(),
    award: Joi.string().required()
})
