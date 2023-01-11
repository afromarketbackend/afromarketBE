const models = require('../../../db/models')
var {Op} = require('sequelize')
const {hashPassword, comparePassword,forgotPassword, resetPassword} = require('../../../common/helpers/password')
const adminOrderservice = require('../order/admin-order.service')
const { jwtSign, jwtVerify} = require('../../../common/helpers/token')
const {
    sequelize,
    Admin,
    User,
    Merchant,
    Order,
} = models

const startOfDay = new Date().setUTCHours(0, 0, 0, 0);
startOfDay;

const endOfDay = new Date().setUTCHours(23, 59, 59, 999);
endOfDay;

exports.adminHome = async(data)=>{

    try {
        const {
            totalOrders,
            activeOrders,
            deliveredOrders,
            disputedOrders,
            newUsers,
            newVendors
        } = data
            const totalOrder = await Order.findAndCountAll({
                where:{
                    created_at:{
                        [Op.between]:[
                            totalOrders?.startDate?new Date(totalOrders?.startDate):startOfDay,
                            totalOrders?.endDate?new Date(totalOrders?.endDate):endOfDay
                        ]
                    }
                }
            })
            const activeOrder = await Order.findAndCountAll({
                where:{  
                    created_at:{
                        [Op.between]:[
                            activeOrders?.startDate?new Date(activeOrders.startDate):startOfDay,
                            activeOrders?.endDate?new Date(activeOrders.endDate):endOfDay
                        ]
                    },
                    status:"active"
                }
            })

            const deliveredOrder = await Order.findAndCountAll({
                where:{
                    created_at:{
                        [Op.between]:[
                            deliveredOrders?.startDate?new Date(deliveredOrders?.startDate):startOfDay,
                            deliveredOrders?.endDate?new Date(deliveredOrders?.endDate):endOfDay
                        ]
                    },
                    status:"delivered"
                }
            })

            const disputedOrder = await Order.findAndCountAll({
                where:{
                    created_at:{
                        [Op.between]:[
                            disputedOrders?.startDate?new Date(disputedOrders?.startDate):startOfDay,
                            disputedOrders?.endDate?new Date(disputedOrders?.endDate):endOfDay
                        ]
                    },
                    status:"disputed"
                }
            })

            const newUser = await User.findAndCountAll({
                where:{
                    [Op.or]:[ 
                        {    
                            created_at:{[Op.between]:[
                                newUsers?.startDate?new Date(newUsers?.startDate):startOfDay,
                                newUsers?.endDate?new Date(newUsers?.endDate):endOfDay
                            ]}
                            ,
                        deleted:false
                        },
                    ]
                }
            })

            const newVendor = await Merchant.findAndCountAll({
                where:{
                    [Op.or]:[ 
                        {    
                            created_at:{[Op.between]:[
                                 newVendors?.startDate?new Date( newVendors?.startDate):startOfDay,
                                 newVendors?.endDate? new Date(newVendors?.endDate):endOfDay
                            ]}
                            ,
                        deleted:false
                        },
                    ]
                }
            })

            
        return{
            error: false,
            message: "Home page loaded successfuly",
            data: {
                totalOrders: totalOrder,
                activeOrders: activeOrder,
                deliveredOrders: deliveredOrder,
                disputedOrders: disputedOrder,
                newUsers: newUser,
                newVendors: newVendor
            }
        }

    } catch (error) {
         console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to load page at the moment",
            data: null
        }
    }
} 