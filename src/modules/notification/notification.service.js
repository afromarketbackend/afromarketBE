
const KEYS = require('../../common/config/keys')
const models = require('../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const randomString = require('../../common/helpers/randString')
const {
    sendOrderDetailstoMail,
    sendMailToMerchant,
    createInAppNotification
} = require('../email-notification/email.service')
const {deliveryDate} = require('../../common/helpers/deliveryDate')
const { uuid } = require('uuidv4')
const {initiateWithdrawal} = require('../withdrawal/withdrawal.service')
const {getPaginatedRecords} = require('../../common/helpers/paginate')

const {
    sequelize,
    Order,
    Product,
    OrderedItem,
    Inventory,
    Notification,
    Customer,
    Merchant,
    Tracker
} = models

exports.getMyNotifications = async (payload) =>{
    try {
        const {
            user,
            limit,
            page
        } = payload
        const myNotifications = await getPaginatedRecords(Notification, {
            limit: limit?Number(limit): 10,
            page: page? Number(page): 1,
            data : {
                [Op.or]: [{MerchantId: user.id}, {UserId: user.id}]
            },
            // data : {isRead: false,},
            selectedFields: [ "id", "title", "created_at", "UserId", "MerchantId"]
        })
        const all = await Notification.findAll()
        return {
            error: false,
            message: "Notifications Retreived successfully",
            data: myNotifications,
            // data: all
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive notifications at the moment",
            data: null
        }
        
    }
}

exports.viewANotification = async (payload) =>{
    try {
        const {
            user,
            notification_id
        } = payload
        const notification = await Notification.findOne({
            where:{
                id: notification_id,
                [Op.or]: [{MerchantId: user.id}, {UserId: user.id}]
                
            }
        })
        if (notification){
            await Notification.update(
                {
                    isRead: true
                },
                {
                    where:{
                        id: notification.id
                    }
                }
            )
        }

        return {
            error: false,
            message: "Notification Retreived successfully",
            data: notification
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive notification at the moment",
            data: null
        }
        
    }
}