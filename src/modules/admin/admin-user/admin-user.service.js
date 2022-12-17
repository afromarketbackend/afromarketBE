const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {hashPassword, comparePassword,forgotPassword, resetPassword} = require('../../../common/helpers/password')
const { jwtSign, jwtVerify} = require('../../../common/helpers/token')
const {
    sequelize,
    Admin,
} = models

exports.registerAdmin = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingAdmin = await Admin.findAll({
            where:{
                email: data.email
            }
        })

        if(existingAdmin.length > 0){
            return{
                error: true,
                message: 'Email already exist on the server',
                data: null
            }
        }
        const newAdmin = await Admin.create(
            {
                ...data,
                password: data.password? password: null
            },
            {raw: true}
        )
        return {
            error: false,
            message: "Admin registered successfully",
            data: newAdmin
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable to register Admin at the moment",
            data: null
        }
        
    }
}

exports.loginAdmin = async(user, data) => {
    try {
        if(data.password){
            const passwordMatch = await comparePassword(user.password, data.password)
            if (!passwordMatch) {
                return {
                    error: true,
                    message: "Incorrect password.",
                };
            }
        }
         if(!data.password && !data.auth_type){
            return {
                error: true,
                message: "Invalid Authorization",
            };
        }

        const refreshToken = jwtSign(user.id)
        await Admin.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id}}
        )
        const loginAdmin = await Admin.findOne({
            attributes:['email','fullname', 'id', "role"],
            where: {id:user.id}
        })

        return{
            error: false,
            message: 'Login successful',
            data: {loginAdmin, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in admin at the moment",
            data: null
        }
    }
}

exports.logoutAdmin = async(token) => {
    try {
        const {id} = jwtVerify(token)
        const loggedInAdmin = await Admin.findOne({where:{id: id}})
        if(!loggedInAdmin){
            return {
                error: true,
                message: "User not found",
            }
        }
        await Admin.update(
            {refreshTokens: null},
            {where: {id: loggedInAdmin.id}}
        )

        const loggedOutAdmin = await Admin.findOne({where: {id: loggedInAdmin.id}})
        return{
            error: false,
            message: 'Logout successful',
            data: loggedOutAdmin
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log out admin at the moment",
            data: null
        }
    }
}

exports.forgotPassword = async(body) => {
    try {
        const {email} = body
        const forgot = await forgotPassword(Admin, email)
        return{
            error: forgot.error,
            message: forgot.message,
            data: forgot.data 
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to send email at the moment",
            data: null
        }
    }
}

exports.resetPassword = async(body) => {
    try {
        const {newPassword, otp} = body
        const {model, email} = await resetPassword(Admin, otp, newPassword)

    return{
        error: false,
        message: `password of ${email} changed successfully`,
        data: model
    }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to change password at the moment",
            data: null
        }
    }
}