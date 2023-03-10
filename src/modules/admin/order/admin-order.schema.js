const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);


exports.getAllOrdersSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.singleOrderSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.searchSchema = Joi.object().keys({
    search: Joi.string().required(),
})
exports.filterSchema = Joi.object().keys({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    status: Joi.string().optional(),
})