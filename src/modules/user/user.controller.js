const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const UserService = require('./user.service')

exports.registerUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.registerUser({
            ...req.body
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
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.loginUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.loginUser(req.user,req.body)

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

exports.viewUserProfileController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.viewUserProfile(req.user)

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


exports.updateUserProfileController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.updateUserProfile({
            user: req.user,
            email: req.body.email,
            fullName: req.body.fullName,
            phone_number: req.body.phone_number,
            delivery_address: req.body.delivery_address,
            file: req.file
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
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.changePasswordController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.changePassword({
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
            user: req.user
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
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}


exports.logoutUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.logoutUser(req.token)

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


exports.forgotPasswordController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.forgotPassword(req.body)

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

exports.resetPasswordController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.resetPassword(req.body)

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