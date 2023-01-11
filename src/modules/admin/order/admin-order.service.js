const models = require('../../../db/models')
var {Op} = require('sequelize')
const {getPaginatedRecords, paginateRaw} = require('../../../common/helpers/paginate')
const {
    sequelize,
    Order,
    User,
    OrderedItem,
    Product
} = models 

exports.getAllOrdersByAdmin = async (data) =>{
    try {
        const {limit, page} = data
        const allOrders = await getPaginatedRecords(Order, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "items", "isPaid", "payment_type", "order_cost", 'status', 'UserId','created_at', 'updated_at']
        })
        return {
            error: false,
            message: "Orders retreived successfully",
            data: {
                allOrders: allOrders,
                pagination: allOrders.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive orders at the moment",
            data: null
        }
        
    }
}


exports.getOneOrderyAdmin = async (id) =>{
    try {
       const order = await Order.findOne({where:{id}})
       if(!order){
            return {
                error: true,
                message: "Orders Not Found",
                data:null
            }
       }
       let orderedItems = []
       const itemsIds = order.items
       for(const id of itemsIds){
        const item = await OrderedItem.findOne({where:{id:id}})
        orderedItems.push(item)
       }
       const customer = await User.findOne({where:{id: order.UserId}})
       
        return {
            error: false,
            message: "Order retreived successfully",
            data: {
                order: order,
                orderedItems: orderedItems,
                customer: customer
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive order at the moment",
            data: null
        }
        
    }
}

exports.searchForOrderByAdmin = async (data) =>{
    try {
        const {search} = data
        const result = await Order.findAll({
            where: {
                trackingId: sequelize.where(sequelize.fn('LOWER', sequelize.col('trackingId')), 'LIKE', '%' + search + '%')
            },
        }) 
        return {
            error: false,
            message: "Orders retreived successfully",
            data: result
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive orders at the moment",
            data: null
        }
        
    }
}

exports.getAllOrdersBySatusAdmin = async (data) =>{
    try {
        const{startDate, endDate, limit, page, status} = data

        const paginatedOrders = await getPaginatedRecords( Order,{
            limit: limit?Number(limit):10,
            page: page?Number(page):1,
            data: {
                created_at:{[Op.between]:[
                    startDate,
                    endDate
                ]}
                ,
                status:status
            }
        })
        return {
            error: false,
            message: `${status} Orders retreived successfully`,
            data: {
                orders: paginatedOrders,
                pagination: paginatedOrders.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive orders at the moment",
            data: null
        }
        
    }
}

