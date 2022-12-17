const KEYS = require('../../common/config/keys')
const Flutterwave = require('flutterwave-node-v3')
const flw = new Flutterwave(KEYS.flwPubkey, KEYS.flwSecKey)
const axios = require('axios')
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

exports.getWallet = async (data) =>{
    try {
        const {user_id} = data
        const existingUser = await User.findOne({where:{id: user_id, deleted:false}})
       
        if(!existingUser){
            return{
                error: true,
                message: 'User Not Found',
                data: null
            }
        }

        let newWallet
        const userWallet = await Wallet.findOne({where:{UserId: existingUser.id, deleted: false}})
       if(!userWallet){
         newWallet = await Wallet.create({
            UserId: existingUser.id
         })
       }

        return {
            error: false,
            message: "Wallet fetched successfully",
            data: userWallet?userWallet: newWallet
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable fetch Wallet at the moment at the moment",
            data: null
        }
        
    }
}

exports.fundWallet = async (data) =>{
    try {
        const {user_id, topUpDetails} = data
        const existingUser = await User.findOne({where:{id: user_id, deleted:false}})
       
         const paymentDetails = {
            tx_ref: uuid(),
            amount: Number(orderPlaced.total),
            redirect_url: KEYS.flwRedirectUrl,
            email: user.email,
            name: user.fullName,
            phone_number: user.phone_number,
            order_id: placedOrder.id,
            tracking_id: tracking_id
        }
        if(!existingUser){
            return{
                error: true,
                message: 'User Not Found',
                data: null
            }
        }

        let newWallet
        const userWallet = await Wallet.findOne({where:{UserId: existingUser.id, deleted: false}})
       if(!userWallet){
         newWallet = await Wallet.create({
            UserId: existingUser.id
         })
       }

        return {
            error: false,
            message: "Wallet fetched successfully",
            data: userWallet?userWallet: newWallet
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable fetch Wallet at the moment at the moment",
            data: null
        }
        
    }
}

       
        