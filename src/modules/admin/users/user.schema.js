const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);


exports.getAllUsersSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.singleUserSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.searchSchema = Joi.object().keys({
    search: Joi.string().required(),
})
exports.filterSchema = Joi.object().keys({
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
})