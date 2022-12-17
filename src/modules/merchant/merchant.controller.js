const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const MerchantService = require('./merchant.service')

exports.registerMerchantController = async (req, res, next) => {
    try {
        const {error, message, data} = await MerchantService.registerMerchant({
            business_name: req.body.business_name,
            business_description: req.body.business_description,
            business_type: req.body.business_type,
            tax_id_number: req.body.tax_id_number,
            email: req.body.email,
            inputedPassword: req.body.password,
            phone_number: req.body.phone_number,
            address: req.body.address,
            bank_name: req.body.bank_name,
            account_name: req.body.account_name,
            account_number: req.body.account_number,
            bank_verification_number: req.body.bank_verification_number,
            files: req.files

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

exports.loginMerchantController = async (req, res, next) => {
    try {
        const {error, message, data} = await MerchantService.loginMerchant(req.user,req.body)
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
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}


exports.getAllMerchantsController = async (req, res, next) => {
    try {
        const {error, message, data} = await MerchantService.getAllMerchants({
            limit: req.query.limit,
            page: req.query.page
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
        // console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.viewAMerchantController = async (req, res, next) => {
    try {
        const {error, message, data} = await MerchantService.viewAMerchant({
            merchant_id: req.params.id
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
        // console.error(error);

        return next(createError.InternalServerError(error));
    }
}