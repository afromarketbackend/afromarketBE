const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.createReviewSchema = Joi.object().keys({
    text: Joi.string().required(),
    rating: Joi.number().optional()
})


exports.singleItemSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.getProductReviewSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});