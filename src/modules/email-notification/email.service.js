const models = require('../../db/models')
var Sequelize = require('sequelize')
const randomString = require('../../common/helpers/randString')
const nodemailer = require('nodemailer')
const KEYS = require('../../common/config/keys')

const {
    sequelize,
    Order,
    Product,
    OrderedItem,
    Merchant,
    Inventory,
    Tracker
} = models

exports.sendOTPtoMail = async (data) =>{
    try {
        const{email, mailSubject, fullName, otp} = data
        const firstName = fullName.split(' ')[1]
        const message = {
            from: KEYS.mailSender,
            to: email,
            subject: mailSubject,
            html: `<h1>Hello ${firstName}, here's your otp:</h1> <h2>${otp}</h2>`

        }
        let transporter =  nodemailer.createTransport({
            host: KEYS.mailHost,
            service:'Gmail',
            auth:{
                user: KEYS.mailAuthUser,
                pass: KEYS.mailAuthPass
            }
        })

      let info =  await  transporter.sendMail(message)
        if(!info){
            return{
                error: true,
                message: "Unable to send email at the moment",
                data: null
            }
        }
        return{
            error: false,
            message: `Successfully sent mail to: ${email}`,
            data: info
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

exports.sendOrderDetailstoMail = async (data) =>{
    try {
        const{
            email, 
            fullName,
            items, 
            order
        } = data
        const firstName = fullName.split(' ')[1]
        const dueDate = String(order.delivery_date).slice(0,15)
        var orders = ``
        for(const id of items){
            const item = await OrderedItem.findOne({where: {id: id}}) 
          var string=  `
            <img src=${item.picture} alt="picture">
            <ul>
                <li>product : ${item.product_name}</li>
                <li>price : ${item.price}</li>
                <li>quantity ordered : ${item.quantity_ordered}</li>
                <li>total : ${item.total}</li>
            </ul>
            `
            orders += string
        }



        const message = {
            from: KEYS.mailSender,
            to: email,
            subject: 'AfroMarket Order Details',
            html: `<h2>Hello ${firstName}, below are the details of the order you placed:</h2> 
            <h4>items in order:</h4>
             ${orders}
            <h4>paid status: ${order.is_paid}</h4>
            <h4>payment type: ${order.payment_type}</h4>
            <h4>total price for order : ${order.total}</h4>
            <h4>delivery type: ${order.delivery_type}</h4>
            <h4>delivery address: ${order.delivery_address}</h4>
            <h4>delivery date: ${dueDate}</h4>
            <h4>tracking ID: ${order.tracking_id}</h4>
           
            `
        }
        let transporter =  nodemailer.createTransport({
            host: KEYS.mailHost,
            service:'Gmail',
            auth:{
                user: KEYS.mailAuthUser,
                pass: KEYS.mailAuthPass
            }
        })

      let info =  await  transporter.sendMail(message)
        if(!info){
            return{
                error: true,
                message: "Unable to send email at the moment",
                data: null
            }
        }
        return{
            error: false,
            message: `Successfully sent mail to: ${email}`,
            data: info
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

exports.sendMailToMerchant = async (data) =>{
    try {
        const{productIds} = data
        const mailResponses = []
        for(const id of productIds){
            const item = await OrderedItem.findOne({where:{id}})
            const {email, business_name} = await Merchant.findOne({where:{id: item.MerchantId}})
            const content = {
            from: KEYS.mailSender,
            to: email,
            subject: "Order For Your Product",
            html: `
                <h2>Hello ${business_name},</h2> 
                <h3>Find below the details of customer's order for your product</h3>
                <h4>name: ${item.product_name}</h4>
                <h4>quantiy ordered: ${item.quantity_ordered}</h4>
                <h4>price per quantity: ${item.price}</h4>
                <h4>total: ${item.total}</h4>
            `
            }
            let transporter =  nodemailer.createTransport({
                host: KEYS.mailHost,
                service:'Gmail',
                auth:{
                    user: KEYS.mailAuthUser,
                    pass: KEYS.mailAuthPass
                }
            })

            let info =  await  transporter.sendMail(content)
            if(!info){
                const message = `Unable to send email to ${email} at the moment`
                 mailResponses.push(message)
            } else{
                const message = `Successfully sent mail to: ${email}`
                mailResponses.push(message)
            }

        }
        return {
            error: false,
            message: 'success',
            data: mailResponses
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
