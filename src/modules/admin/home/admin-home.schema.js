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

exports.adminHomeSchema = Joi.object().keys({
    totalOrders: Joi.object().keys({
        // startDate: Joi.string().optional(),
        startDate: Joi.date().utc().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
        endDate: Joi.date().utc().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
    }).optional(),
    activeOrders: Joi.object().keys({
        startDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
        endDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
    }).optional(),
    deliveredOrders: Joi.object().keys({
        startDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
        endDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
    }),
    disputedOrders: Joi.object().keys({
        startDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
        endDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
    }).optional(),
    newUsers: Joi.object().keys({
        startDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
        endDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
    }).optional(),
    newVendors: Joi.object().keys({
        startDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
        endDate: Joi.date().format('YYYY-MM-DDTHH:mm:SS.sssZ').optional(),
    }).optional(),
})