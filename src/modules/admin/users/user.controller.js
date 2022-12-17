const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const adminUsersService = require('./user.service')

exports.getAllUsersController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminUsersService.getAllUsers({
            limit: req.query.limit, 
            page: req.query.page,
        })

        // const allData = {
        //     pagination:data.pagination,
        //     orders: data.allOrders
        // }

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

exports.searchUserController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminUsersService.searchForUserByAdmin(req.body)
        
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

exports.getAUserController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminUsersService.getOneUserByAdmin(req.params.id)
        
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

exports.getNewUsersController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminUsersService.getNewUsersByAdmin({
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

exports.flagAUserController = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminUsersService.flagUserByAdmin(req.params.id)
        
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
