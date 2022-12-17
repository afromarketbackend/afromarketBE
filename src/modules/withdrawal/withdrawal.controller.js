const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const WithdrawalService = require('./withdrawal.service')

exports.myWithdrawalsController = async (req, res, next) => {
    try {
        const {error, message, data} = await WithdrawalService.myWithdrawals({
            user_id: req.userId, 
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

exports.viewOneWithDrawalController = async (req, res, next) => {
    try {
        const {error, message, data} = await WithdrawalService.viewOneWithdrawal(req.params.id)
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

exports.makewithdrawalController = async (req, res, next) => {
    try {
        const {error, message, data} = await WithdrawalService.makeWithdrawal({
            user_id: req.userId
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

