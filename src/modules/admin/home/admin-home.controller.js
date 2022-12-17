const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const adminHomeService = require('./admin-home.service')

exports.home = async (req, res, next) =>{
     try {
        const {error, message, data} = await adminHomeService.adminHome(req.body)

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
