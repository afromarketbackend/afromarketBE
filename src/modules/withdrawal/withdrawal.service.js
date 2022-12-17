
const KEYS = require('../../common/config/keys')
const models = require('../../db/models')
var Sequelize = require('sequelize')
const randomString = require('../../common/helpers/randString')
const {deliveryDate} = require('../../common/helpers/deliveryDate')
const { uuid } = require('uuidv4')

const {
    sequelize,
    Order,
    Product,
    OrderedItem,
    Inventory,
    Merchant,
    Tracker,
    Withdrawal
} = models

exports.initiateWithdrawal = async (payload) => {
    try {
        const {
            orderId,
            tx_ref
        } = payload
        const withdrawals = []
        const order = await Order.findOne({where:{id:orderId}})

        if(!order){
            return {
                error: true,
                message: 'Order not found',
                data: null 
            }
        }
        const itemsIds = order.items
        for(const id of itemsIds ){
            const item = await OrderedItem.findOne({where:{id}})
            if(Boolean(item.resale) === true){
                const resaler = await Merchant.findOne({where: {id: item.profit_owner}})
                const merchant = await Merchant.findOne({where:{id: item.MerchantId}})
                const resaleWithdrawal = await Withdrawal.create({
                    tx_ref,
                    amount: Number(item.resale_profit),
                    order_id: orderId,
                    tax: 0.05*Number(item.total),
                    MerchantId: item.profit_owner,
                    resale: true,
                    email: resaler.email
                })
                const merchWithdrawal = await Withdrawal.create({
                    tx_ref,
                    amount: Number(item.total) - Number(item.resale_profit),
                    order_id: orderId,
                    tax: 0.05*(Number(item.total) - Number(item.resale_profit)),
                    MerchantId: item.MerchantId,
                    email: merchant.email
                })
                withdrawals.push(resaleWithdrawal, merchWithdrawal)
            } else {
                const merchant = await Merchant.findOne({where:{id: item.MerchantId}})
                const merchWithdrawal = await Withdrawal.create({
                    tx_ref,
                    amount: Number(item.total),
                    order_id: orderId,
                    tax: 0.05*(Number(item.total)),
                    MerchantId: item.MerchantId,
                    email: merchant.email
                })
                withdrawals.push(merchWithdrawal)

            }
        }
        return {
            error: false,
            message: 'Withdrawals created successfully',
            data: withdrawals
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || 'Unable to initiate withdrawals at the moment',
            data: error
        }
    }
} 

exports.updateWithdrawal = async (payload) => {
    try {
        const {
            orderId,
            tx_ref,
            status
        } = payload
        await Withdrawal.update(
            {status},
            {where:{tx_ref, order_id: orderId}}
        )
        const updatedWithdrawals = await Withdrawal.findAll({
            where:{
                tx_ref, 
                order_id: orderId,
                status
            }
        })
        return {
            error: false,
            message: 'Withdrawals updated successfully',
            data: updatedWithdrawals
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || 'Unable to update withdrawals at the moment',
            data: error
        }
    }
} 



exports.myWithdrawals = async (data) => {
    try {
        const {
            user_id,
        } = data
        const myWithdrawals = await Withdrawal.findAll({
            where:{MerchantId: user_id},
             order: [
                ['created_at', 'DESC'],
            ],
        })
        if(myWithdrawals.length <1){
            return {
                error: true,
                message: "No withdrawals found at this time"
            }
        }

        return {
            error: false,
            message: 'Withdrawals retrieved successfully',
            data: myWithdrawals
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve withdrawals at the moment",
            data: null
        }
    }
}

exports.viewOneWithdrawal = async (id) => {
    try {
        const withdrawal = await Withdrawal.findOne({where: {id}})
        if(!withdrawal){
            return {
                error: true,
                message: "Withdrawal Not Found",
                data: null
            }
        }
        const associatedOrder = await Order.findOne({where:{id: withdrawal.order_id}})
        const myItemsInOrder = []
        for (const itemId of associatedOrder.items){
            const item = await OrderedItem.findOne({
                where:{id: itemId}
            })
            // if (Boolean(item.resale) === true) {
            //     const myItem = await Inventory.findOne({
            //         where:{ProductId: item.ProductId}
            //     })
            //     myItemsInOrder.push(myItem)
            // } else {
            //     const myItem = await Product.findOne({
            //         where:{id: item.ProductId}
            //     })
            //     myItemsInOrder.push(myItem)
            // }
            myItemsInOrder.push(item)
        }
        
        return {
            error: false,
            message: "Withdrawal retrieved successfully",
            data: {withdrawal, associatedOrder, myItemsInOrder}
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Unable to retrieve Withdrawal at the moment',
            data: null
        }
    }
}

exports.makeWithdrawal = async (data) =>{
    try {
        const {
            user_id,
        } = data 
        const merchant = await Merchant.findOne({where: {id: user_id}})
        if (!merchant){
            return {
                error: true,
                message: "Merchant not Found",
                data: null
            }
        }
       //Fetch due withdrawals
       const withdrawals = await Withdrawal.findAll({
            where:{
                MerchantId: merchant.id,
                // due_date :{
                //     [Op.lte]: moment().toDate()
                // }
            }
       })

       if(withdrawals.length < 1){
        return {
            error: true,
            message: "No due withdrawals at this moment",
            data: null
        }
       }


       const totalDueAmount = await Withdrawal.findAll({
        attributes:[
            'MerchantId',
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
        ],
        group: ['MerchantId'],
        where:{MerchantId: user_id},
        raw: true
       })
       const total_amount = totalDueAmount[0].total_amount
       const ref = `AM-${Math.floor(Date.now() + Math.random() * 100000000)
            .toString(36)
            .toUpperCase()}`
        const withdrawalDetails ={
            amount: Number(total_amount) ,
            payable_amount: Number(total_amount) - 0.005*(Number(total_amount)),
            debit_currency: 'NGN',
            email: merchant.email,
            phone_number: merchant.phone_number,
            tax: 0.005*(Number(total_amount)),
            narration: "Withdrawal for Goods ordered by customers",
            date_initiated: new Date(),
            beneficiary_account_bank: merchant.bank_name,
            beneficiary_account_name: merchant.account_name,
            beneficiary_account_number: merchant.account_number,
            payment_ref : ref,
            MerchantId: merchant.id,
            
        }

        return {
            error: false,
            message: 'Withdrawal Initiated successfully',
            data: withdrawalDetails
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message,
            data: null
        }
    }
}