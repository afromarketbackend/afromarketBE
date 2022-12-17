const models = require('../../db/models')
var Sequelize = require('sequelize')
const randomString = require('../../common/helpers/randString')


const {
    sequelize,
    Order,
    OrderedItem,
} = models

exports.getSingleOrderedItem = async ( data) =>{
    try {

        const {ordered_item_id, order_id, userId,} = data
        const order = await Order.findOne({
            where:{
                id: order_id,
                deleted: false,
                UserId: userId
            }
        })

        if(!order){
            return{
                error: true,
                message: "Order not found",
                data: null
            }
        }

        const ordered_item = await OrderedItem.findOne({
            where:{
                id: ordered_item_id,
                OrderId: order.id,
                deleted: false
            }
        })

         return {
            error: false,
            message: "Ordered Item Retreived successfully",
            data: ordered_item
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive ordered item at the moment",
            data: null
        }
        
    }
}


exports.getAllOrderedItemsOfAnOrder = async (id) =>{
    try {
        const allOrderedItemsOfAnOrder = await OrderedItem.findAll({
            where:{
                OrderId: id
            },
             order: [
                ['created_at', 'DESC'],
            ],
        })
        
        if(Number(allOrderedItemsOfAnOrder.length) < 1 ){
            return{
                error: true,
                message: 'Cannot find any item in this order',
                data: null
            }
        }        
        
        return {
            error: false,
            message: "Ordered Items Retrieved successfully",
            data: allOrderedItemsOfAnOrder
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retrieve ordered Items at the moment",
            data: null
        }
        
    }
}


