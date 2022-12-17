const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const InventoryService = require('./inventory.service')

exports.addProductToInventoryController = async (req, res, next) => {
    try {
        const {error, message, data} = await InventoryService.addProductToInventory({
            merchant_id: req.userId, 
            product_id: req.params.id,
            payload: req.body
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

exports.getSingleProductFromInventoryController = async (req, res, next) => {
    try {
        const {error, message, data} = await InventoryService.singleInventoryItem({
            inventory_owner: req.userId, 
            inventory_id: req.params.id,
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

exports.getAllProductsFromMyInventoryController = async (req, res, next) => {
    try {
        const {error, message, data} = await InventoryService.allMyInventories({
            inventory_owner: req.userId,
            limit: req.query.limit,
            page: req.query.page, 
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


exports.removeProductFromInventoryController = async (req, res, next) => {
    try {
        const {error, message, data} = await InventoryService.removeProductFromInventory({
            inventory_owner: req.userId, 
            inventory_id: req.params.id,
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

exports.getAllInventoryController = async (req, res, next) => {
    try {
        const {error, message, data} = await InventoryService.allInventories({
            limit: req.query.limit,
            page: req.query.page, 
        })
        const allData = {
            pagination: data.pagination,
            products: data.allInventories
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
        return createResponse(message, allData)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.searchInventoryController = async (req, res, next) => {
    try {
        const {error, message, data} = await InventoryService.searchInventory({
            limit: req.query.limit,
            page: req.query.page,
            search: req.body.search
        })

       const allResults = {
        pagination : data.pagination,
        results: data.result
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
        return createResponse(message, allResults)(res, HTTP.CREATED);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}


