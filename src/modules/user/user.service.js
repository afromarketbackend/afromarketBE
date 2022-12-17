const models = require('../../db/models')
var Sequelize = require('sequelize')
const {hashPassword, comparePassword, forgotPassword, resetPassword} = require('../../common/helpers/password')
const {jwtSign, jwtVerify} = require('../../common/helpers/token')
const { fileUploader } = require('../../common/helpers/cloudImageUpload')
const {
    sequelize,
    User,
    Wallet
} = models

exports.registerUser = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingUser = await User.findAll({
            where:{
                email: data.email
            }
        })

        if(existingUser.length > 0){
            return{
                error: true,
                message: 'Email already exist on the server',
                data: null
            }
        }

        const newUser = await User.create(
            {
                ...data,
                password: data.password? password: null,
            },
            {raw: true}
        )
        const userWallet = await Wallet.create({
            UserId: newUser.id
        })
        const userData = {
            id : newUser.id,
            isVerified: newUser.isVerified,
            isBlocked: newUser.isBlocked,
            deleted: newUser.deleted,
            fullName: newUser.fullName,
            email: newUser.email,
            password: newUser.password,
            updated_at: newUser.updated_at,
            created_at: newUser.created_at,
            userWallet: userWallet
        }
        return {
            error: false,
            message: "User registered successfully",
            data: userData
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable to register user at the moment",
            data: null
        }
        
    }
}

exports.loginUser = async(user, data) => {
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
        let userWallet
        userWallet = await Wallet.findOne({where: {UserId: user.id, deleted: false}})

        const refreshToken = jwtSign(user.id)
        await User.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id}}
        )
        const loginUser = await User.findOne({
            attributes:['email','fullname', 'id', 'refreshTokens', 'phone_number', 'delivery_address', 'avatar'],
            where: {
                id:user.id,
                
            }
        })


        if(Boolean(loginUser.isBlocked) === true) {
            return {
                error: true,
                message: "This user has been blocked from accessing this platform",
                data: null
            }
        }

        return{
            error: false,
            message: 'Login successful',
            data: {loginUser, accesstoken: refreshToken, userWallet}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in user at the moment",
            data: null
        }
    }
}

exports.viewUserProfile = async(user) => {
    try {
        const profile = await User.findOne({
            attributes:{exclude:["password"]},
            where:{id: user.id}
        })
        return{
            error: false,
            message: 'Profile Retrieved successfully',
            data: profile
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retrieve user profile at the moment",
            data: null
        }
    }
}

exports.updateUserProfile = async(body) => {
    try {
        const {
            user,
            email,
            fullName,
            phone_number,
            delivery_address,
            file
        } = body
        const existingUser = await User.findOne({where:{id: user.id}})
        if(!existingUser){
            return {
                error: true,
                message: "User Not Found",
                data: null
            }
        }
        const url = file?.path? await fileUploader(file.path): null

        await User.update(
            {
                email: email? email: existingUser.email,
                fullName: fullName? fullName: existingUser.fullName,
                avatar: file? url: existingUser.avatar,
                delivery_address: delivery_address? delivery_address: existingUser.delivery_address,
                phone_number: phone_number? phone_number: existingUser.phone_number
            },
            {where:{id: existingUser.id}}
        )
        const updatedUser = await User.findOne({
            attributes: {exclude:["password"]},
            where:{id: existingUser.id}
        })
        return{
            error: false,
            message: 'Profile Updated successfully',
            data: updatedUser
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to update user profile at the moment",
            data: null
        }
    }
}


exports.changePassword = async(body) => {
    try {
        const {
            oldPassword,
            newPassword,
            user
        } = body
        const passwordMatch = await comparePassword(user.password, oldPassword)
         if (!passwordMatch) {
            return {
                error: true,
                message: "Old Password is Incorrect",
            };
        }

        const password = hashPassword(newPassword)

        await User.update(
            {password: password},
            {where: {id: user.id}}
        )
        const changedUserPassword = await User.findOne({
            attributes:{exclude:["password"]},
            where:{id: user.id}
        })
        return{
            error: false,
            message: "Password Changed Successfully",
            data: changedUserPassword
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

exports.logoutUser = async(token) => {
    try {
        const {id} = jwtVerify(token)
        const loggedInuser = await User.findOne({where:{id: id}})
        if(!loggedInuser){
            return {
                error: true,
                message: "User not found",
            }
        }
        await User.update(
            {refreshTokens: null},
            {where: {id: loggedInuser.id}}
        )

        const loggedOutUser = await User.findOne({
            attributes: {exclude:["password"]},
            where: {id: loggedInuser.id}
        })
        return{
            error: false,
            message: 'Logout successful',
            data: loggedOutUser
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log out user at the moment",
            data: null
        }
    }
}

exports.forgotPassword = async(body) => {
    try {
        const {email} = body
        const forgot = await forgotPassword(User, email)
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
        const {model, email} = await resetPassword(User, otp, newPassword)

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