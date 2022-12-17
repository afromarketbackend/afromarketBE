const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const adminProductService = require('./admin-product.service')

exports.getAllProductsController = async (req, res, next) => {
    try {
        const {error, message, data} = await adminProductService.getAllProducts({
            limit: req.query.limit, 
            page: req.query.page,
        })

        const allData = {
            pagination: data.pagination,
            products: data.allProducts
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

exports.getAProductByAdminController = async (req, res, next) => {
    try {
        const {error, message, data} = await adminProductService.getAProductByAdmin(req.params.id)

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

exports.flagAProductByAdminController = async (req, res, next) => {
    try {
        const {error, message, data} = await adminProductService.flagProductByAdmin(req.params.id)

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

