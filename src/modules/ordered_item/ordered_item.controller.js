const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const OrderItemService = require('./ordered_item.service')

exports.getSingleOrderedItemController = async (req, res, next) => {
    try {
        const {error, message, data} = await OrderItemService.getSingleOrderedItem({
            userId:req.userId, 
            order_id:req.params.id,
            ordered_item_id:req.params.item_id
        })

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}


exports.getAllOrderedItemsOfAnOrderController = async (req, res, next) => {
    try {
        const {error, message, data} = await OrderItemService.getAllOrderedItemsOfAnOrder(req.params.id)

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

