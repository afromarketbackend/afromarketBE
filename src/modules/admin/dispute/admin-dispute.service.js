const models = require('../../../db/models')
var {Op} = require('sequelize')
const {getPaginatedRecords, paginateRaw} = require('../../../common/helpers/paginate')
const {
    User,
    Dispute,
    Order,
    OrderedItem,
    Merchant,
    Product
} = models

exports.getAllDisputesByAdmin = async (data) =>{
    try {
        const {limit, page} = data
        const allDisputes = await getPaginatedRecords(Dispute, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "product_image", "reason",  'status', "OrderId", "UserId"]
        })
        return {
            error: false,
            message: "Disputes retreived successfully",
            data: {
                allDisputes: allDisputes,
                pagination: allDisputes.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive disputes at the moment",
            data: null
        }
        
    }
}

exports.getOneDisputeByAdmin = async (id) =>{
    try {
       const dispute = await Dispute.findOne({where:{id}})
       if(!dispute){
            return {
                error: true,
                message: "Dispute Not Found",
                data:null
            }
       }
       const order = await Order.findOne({where:{id: dispute.OrderId}})
       const user = await User.findOne({where:{id:dispute.UserId}})
       let orderedItems = []
       const itemsIds = order.items
       for(const id of itemsIds){
        const item = await OrderedItem.findOne({where:{id:id}})
        const merchant = await Merchant.findOne({where:{id: item.MerchantId}})
        const itemInOrder = {
            name: item.product_name,
            picture: item.picture,
            quantity_ordered: item.quantity_ordered,
            price: item.price,
            total: item.total,
            seller_contact: merchant.phone_number,
        }
        orderedItems.push(itemInOrder)
       }
              
        return {
            error: false,
            message: "Dispute retreived successfully",
            data: {
                image: dispute.product_image,
                status: dispute.status,
                reason: dispute.reason,
                customer_contact: user.phone_number,
                description: dispute.description,
                itemsInOrder: orderedItems,
                order: order
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive dispute at the moment",
            data: null
        }     
    }
}


exports.awardDisputeByAdmin = async (payload) =>{
    try {
        const {id, status, award} = payload
       const dispute = await Dispute.findOne({where:{id}})
       if(!dispute){
            return {
                error: true,
                message: "Dispute Not Found",
                data:null
            }
       }

       await Dispute.update(
        {awarded_to: award, status: status},
        {where: {id}}
       )
       
       const awardedDispute = await Dispute.findOne({where: {id}})
       
              
        return {
            error: false,
            message: "Dispute retreived successfully",
            data: awardedDispute
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive dispute at the moment",
            data: null
        }     
    }
}
