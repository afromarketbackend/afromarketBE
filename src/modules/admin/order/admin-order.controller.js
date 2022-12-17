const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const adminOrderService = require('./admin-order.service')

exports.getAllOrdersController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminOrderService.getAllOrdersByAdmin({
            limit: req.query.limit, 
            page: req.query.page,
        })

        const allData = {
            pagination:data.pagination,
            orders: data.allOrders
        }

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

exports.getOneOrderController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminOrderService.getOneOrderyAdmin(req.params.id)

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

exports.searchOrderController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminOrderService.searchForOrderByAdmin(req.body)
        
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

exports.getAllActiveOrdersController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminOrderService.getAllActiveOrdersByAdmin({
            limit: req.query.limit, 
            page: req.query.page,
            startDate: req.body.startDate,
            endDate: req.body.endDate
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

exports.getAllDeliveredOrdersController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminOrderService.getAllDeliveredOrdersByAdmin({
            limit: req.query.limit, 
            page: req.query.page,
            startDate: req.body.startDate,
            endDate: req.body.endDate
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

exports.getAllDisputedOrdersController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminOrderService.getAllDisputedOrdersByAdmin({
            limit: req.query.limit, 
            page: req.query.page,
            startDate: req.body.startDate,
            endDate: req.body.endDate
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
