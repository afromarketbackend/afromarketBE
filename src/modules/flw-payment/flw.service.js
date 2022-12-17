const KEYS = require('../../common/config/keys')
const Flutterwave = require('flutterwave-node-v3')
const flw = new Flutterwave(KEYS.flwPubkey, KEYS.flwSecKey)
const axios = require('axios')
const models = require('../../db/models')
var {Op} = require('sequelize')
const { uuid } = require('uuidv4')
const {updateWithdrawal} = require('../withdrawal/withdrawal.service')
const moment = require('moment/moment')
const {
    sequelize,
    Order,
    Payout,
    Product,
    OrderedItem,
    Inventory,
    Merchant,
    Tracker,
    Transaction,
    Wallet,
    Withdrawal,
} = models


exports.makePaymentInbound = async (paymentDetails) => {
    try {
        
        const {
            user,
            tx_ref,
            amount,
            redirect_url,
            email,
            name,
            phone_number,
            order_id,
            tracking_id

        } = paymentDetails

        const Data = {
                tx_ref,
                amount,
                currency: 'NGN',
                redirect_url,
                customer: {
                    email,
                    phonenumber: phone_number,
                    name,
                    order_id,
                    tracking_id
                }
            }
        if(email !== user.email){
            return{
                error: true,
                message: "payment process diverted",
                data: null
            }
        }



        const {status, statusText, data} = await axios.post(
            KEYS.flwPaymentUrl,
            Data,
            {
                headers: {
                    Authorization: `Bearer ${KEYS.flwSecKey}`
                }
            },
            
        )
        if (status >= 400){
            return {
                error: true,
                message: statusText,
                data: data
            }

        }
        console.log(Transaction);

        const transaction = await Transaction.create(
            {
                tx_ref,
                amount,
                order_id,
                email,
                type: 'inbound',
                UserId: user.id
            },
            {raw: true}
        )

        return{
            error: false,
            message: data.message,
            data: {
                data,
                transaction
            }
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to make payment at the moment",
            data: null  
        }
    }
    
} 


exports.confirmPaymentInbound = async (paymentResponse) => {
    try {
        
        const {
            status,
            tx_ref,
            flw_transaction_id
        } = paymentResponse

        const pendingTransaction = await Transaction.findOne({where:{tx_ref: tx_ref}}) 
        if(!pendingTransaction){
            return {
                error: true,
                message: "Ongoing Transaction Not Found"
            }
        }
        await Transaction.update(
            {
                flw_transaction_id: flw_transaction_id,
                status: status,
            },
            {where:{tx_ref: tx_ref}}
        )
        const completedTransaction = await Transaction.findOne(
            {attributes: {excludes: ['deleted']}},
            {where:{tx_ref: tx_ref}}
            )
        if(status === "successful"){
            await Order.update(
                {isPaid: true},
                {where:{id: pendingTransaction.order_id}}
            )
            const paidOrder = await Order.findOne(
                {attributes:{excludes:['deleted']}},
                {where:{id: pendingTransaction.order_id}}
            )
            return paidOrder
        }
        
        // Update Merchant Withdrawals status to 'approved' since payment has been confirmed
        const payload = {
            orderId: pendingTransaction.orderId,
            tx_ref: tx_ref,
            status: 'approved'
        }
        await updateWithdrawal(payload)

        return{
            error: false,
            message: `payment ${status}`,
            data: {
                completedTransaction,
                paidOrder
            }
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to make payment at the moment",
            data: null  
        }
    }
    
} 

exports.makeMerchantWithdrawal = async (payload) => {
    try {
       const {
        user_id,
        data   
       } = payload 
       console.log(user_id);
       console.log(data.MerchantId);

       if(user_id !== data.MerchantId){
        return {
            error: true,
            message: 'Payout process lost',
            data: null
        } 
       }

       const merchant = await Merchant.findOne({where: {id: user_id}})

       const ref = `AM-${Math.floor(Date.now() + Math.random() * 100000000)
            .toString(36)
            .toUpperCase()}`
       // Create a payout model for the withdrawal
       const payout = await Payout.create({
        ...data,
        beneficiary_account_bank: merchant.bank_name,
        beneficiary_account_name: merchant.account_name,
        beneficiary_account_number: merchant.account_number,
        MerchantId: merchant.id

       })
        const details = {
            account_bank:  merchant.bank_name,
            account_number: merchant.account_number,
            amount: payout.payable_amount,
            narration: payout.narration,
            currency: payout.debit_currency,
            reference: payout.payment_ref,
            callback_url: KEYS.flwRedirectUrl,
            debit_currency: payout.debit_currency,
        }

        const flwWithdrawal = await axios.post(
            KEYS.flyTransferUrl,
            details,
            {
                headers: {
                    Authorization: `Bearer ${KEYS.flwSecKey}`
                }
            },  
        )
        if (flwWithdrawal.status >= 400){
            return {
                error: true,
                message: flwWithdrawal.statusText,
                data: flwWithdrawal.data.message
            }
        }
        const withdrawalData = flwWithdrawal.data

        const transfer_id = withdrawalData.data.id
        await Payout.update(
                {
                    flw_transfer_id: transfer_id,
                    status: withdrawalData.data.status,
                },
                {where:{id: payout.id}}
            )
       

        // if(String(withdrawalStatus.data.status) === "FAILED"){        
        //     await Payout.update(
        //         {
        //             flw_transfer_id: withdrawalData.data.id,
        //             status: 'successful',
        //             date_paid: new Date()
        //         },
        //         {where:{id: payout.id}}
        //     )
        // } else if (String(withdrawalData.status) !== "success"){
        //     const retryPath = `/${withdrawalData.data.id}/retries` 
        //     const retryWithdrawal = await axios.post(
        //         KEYS.flyTransferUrl+retryPath,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${KEYS.flwSecKey}`
        //             }
        //         },
        //     )
        //     withdrawalData = retryWithdrawal.data
        //      if(String(withdrawalData.status) === "success"){        
        //         await Payout.update(
        //             {
        //                 flw_transfer_id: withdrawalData.data.id,

        //             },
        //             {where:{id: payout.id}}
        //         )
        //     }

        // }

        const payoutUpdate = await Payout.findOne({where:{id: payout.id}})
       return {
        error: false,
        message: "Withdrawals Successful",
        data: {
            withdrawalData, 
            payoutUpdate
        }
       }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: "Unable to initiate Transfer",
            data: null
        }
    }
}


exports.fetchTransferResponse = async (data) =>{
    try {
        const {
            user_id,
            transfer_id
        } = data

        const withdrawalStatus = await axios.get(
            KEYS.flyTransferUrl+`/${transfer_id}`,
            {
                headers: {
                    Authorization: `Bearer ${KEYS.flwSecKey}`
                }
            },
        ) 
        const withdrawalStatusData = withdrawalStatus.data
        
        if(String(withdrawalStatusData.data.status) === 'SUCCESSFUL'){
            await Payout.update(
                {
                    status: withdrawalStatusData.data.status,
                    remarks: withdrawalStatusData.data.complete_message,
                    date_paid: new Date()
                },
                {where:{flw_transfer_id: Number(transfer_id)}}
            )
        } else {
            await Payout.update(
                {
                    status: withdrawalStatusData.data.status,
                    remarks: withdrawalStatusData.data.complete_message,
                },
                {where:{flw_transfer_id: Number(transfer_id)}}
            )
        }
        const payoutUpdate = await Payout.findOne(
            {where:{flw_transfer_id: Number(transfer_id)}}
        )
         
        return {
            error: false,
            message: 'Transfer reseponse retrieved successfully',
            data: {
                withdrawalStatusData,
                payoutUpdate
            }
        }

    } catch (error) {
        console.log(error);
        return  {
            error: true,
            message: error.message || "Unable to retrieve transfer at the moment",
            data: null
        }
    }
}

exports.retryWithdrawal = async (data) => {
    try {
        const {
            user_id,
            flw_transfer_id
        } = data
        console.log(flw_transfer_id);
        const failedPayout = await Payout.findOne({
            where: {
                flw_transfer_id: parseInt(flw_transfer_id),
                MerchantId: user_id,
                status: 'FAILED'
            }
        })
        if(!failedPayout){
            return {
                error: true,
                message: 'No transaction Found',
                data: null
            }
        }

        const flwWithdrawalRetry = await axios.post(
            KEYS.flyTransferUrl + `/${flw_transfer_id}/retries`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${KEYS.flwSecKey}`
                }
            },  
        )
        
        const retryData = flwWithdrawalRetry.data
        

        return {
            error: false,
            message: retryData.message,
            data: retryData
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

exports.fetchRetryWithdrawal = async (data) =>{
    try {
        const {
            user_id,
            transfer_id
        } = data

        const retryWithdrawalStatus = await axios.get(
            KEYS.flyTransferUrl+`/${transfer_id}/retries`,
            {
                headers: {
                    Authorization: `Bearer ${KEYS.flwSecKey}`
                }
            },
        ) 
        const withdrawalStatusData = retryWithdrawalStatus.data
        
        if(String(withdrawalStatusData.data.status) === 'SUCCESSFUL'){
            await Payout.update(
                {
                    status: withdrawalStatusData.data.status,
                    remarks: withdrawalStatusData.data.complete_message,
                    date_paid: new Date()
                },
                {where:{flw_transfer_id: Number(transfer_id)}}
            )
        } else {
            await Payout.update(
                {
                    status: withdrawalStatusData.data.status,
                    remarks: withdrawalStatusData.data.complete_message,
                },
                {where:{flw_transfer_id: Number(transfer_id)}}
            )
        }
        const payoutUpdate = await Payout.findOne(
            {where:{flw_transfer_id: Number(transfer_id)}}
        )
         
        return {
            error: false,
            message: 'Transfer reseponse retrieved successfully',
            data: {
                withdrawalStatusData,
                payoutUpdate
            }
        }

    } catch (error) {
        console.log(error);
        return  {
            error: true,
            message: error.message || "Unable to retrieve transfer at the moment",
            data: null
        }
    }
}


exports.fundWallet = async (payload) => {
    try {
        
        const {
            user,
            amount,

        } = payload
        const tx_ref =  uuid()
        const userWallet = await Wallet.findOne({where:{UserId: user.id}})
        const Data = {
                tx_ref: tx_ref,
                amount,
                currency: 'NGN',
                redirect_url: KEYS.flwRedirectUrl,
                customer: {
                    email: user.email,
                    phonenumber: user.phone_number,
                    name: user?.fullName? user.fullName: null,
                    wallet_id: userWallet.id,
                }
            }

        const {status, statusText, data} = await axios.post(
            KEYS.flwPaymentUrl,
            Data,
            {
                headers: {
                    Authorization: `Bearer ${KEYS.flwSecKey}`
                }
            },
            
        )
        if (status >= 400){
            return {
                error: true,
                message: statusText,
                data: data
            }

        }
        console.log(Transaction);

        const transaction = await Transaction.create(
            {
                tx_ref: tx_ref,
                amount: amount,
                wallet_id: userWallet.id,
                previous_balance: userWallet.available_balance,
                new_balance: userWallet.available_balance,
                email: user.email,
                type: 'walletTopUp',
                UserId: user.id
            },
            {raw: true}
        )

        return{
            error: false,
            message: data.message,
            data: {
                data,
                transaction
            }
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to make payment at the moment",
            data: null  
        }
    }
    
} 


exports.confirmWalletTopup = async (paymentResponse) => {
    try {
        
        const {
            user,
            status,
            tx_ref,
            flw_transaction_id
        } = paymentResponse

        const userWallet = await Wallet.findOne({where:{UserId: user.id}})

        const pendingTransaction = await Transaction.findOne({where:{tx_ref: tx_ref, UserId: user.id, wallet_id: userWallet.id }}) 
        if(!pendingTransaction){
            return {
                error: true,
                message: "Ongoing Transaction Not Found"
            }
        }
         await Transaction.update(
            {   
                flw_transaction_id: flw_transaction_id,
                status: status,
            },
            {where:{tx_ref: tx_ref, UserId: user.id}}
        )
        

        //If successful, update the wallet and transaction tracker
        if(status === "successful"){
            await Transaction.update(
                {   
                    new_balance: Number(userWallet.available_balance) + Number(pendingTransaction.amount),
                },
                {where:{tx_ref: tx_ref, UserId: user.id}}
            )
            await Wallet.update(
                {
                   previous_balance: userWallet.available_balance,
                   available_balance: userWallet.available_balance + pendingTransaction.amount
                },
                {where:{UserId: user.id}}
            )
        }
        const completedTransaction = await Transaction.findOne(
            {where:{tx_ref: tx_ref, UserId: user.id}}
        )

       const updateUserdWallet = await Wallet.findOne({where:{UserId: user.id}})

        return{
            error: false,
            message: `wallet TopUp ${status}`,
            data: {
                completedTransaction,
                updateUserdWallet
            }
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to make payment at the moment",
            data: null  
        }
    }
    
} 