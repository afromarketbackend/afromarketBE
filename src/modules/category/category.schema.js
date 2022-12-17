const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.addCategorySchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
})

exports.singleProductSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.uploadProductImageSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.getAllCategoriesSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.searchCategorySchema = Joi.object({
  search:  Joi.string().required(),
});