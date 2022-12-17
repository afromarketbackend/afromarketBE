const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.singleModelSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.inventoryPriceSchema = Joi.object().keys({
    price: Joi.number().required(),
})

exports.getAllProductSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.createRateCardSchema = Joi.object({
  country:  Joi.string().required(),
  state:  Joi.string().required(),
  region:  Joi.string().required(),
  currency:  Joi.string().optional(),
  price: Joi.number().positive().required()

});
