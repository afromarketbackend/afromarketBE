const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.singleInventoryItemSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.inventoryPriceSchema = Joi.object().keys({
    price: Joi.number().required(),
})

exports.getAllProductSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.searchInventorySchema = Joi.object({
  search:  Joi.string().required(),
});
