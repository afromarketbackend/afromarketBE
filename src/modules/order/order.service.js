
const KEYS = require('../../common/config/keys')
const models = require('../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const randomString = require('../../common/helpers/randString')
const {
    sendOrderDetailstoMail,
    sendMailToMerchant
} = require('../email-notification/email.service')
const {deliveryDate} = require('../../common/helpers/deliveryDate')
const { uuid } = require('uuidv4')
const {initiateWithdrawal} = require('../withdrawal/withdrawal.service')

const {
    sequelize,
    Order,
    Product,
    OrderedItem,
    Inventory,
    Customer,
    Merchant,
    Tracker
} = models

exports.createOrder = async (user, data) =>{
    try {

         if(Boolean(user.isBlocked) === true) {
            return {
                error: true,
                message: "This user has been blocked from accessing this platform",
                data: null
            }
        }

        const {order_tray, delivery_address} = data
        let total_price = 0
        let finalOrderedItems = []
        let ordered_items_ids = []
        let customers = []
        const newOrder= await Order.create(
            {   items: '',
                UserId:user.id,
                delivery_address: delivery_address? delivery_address: user.delivery_address,

            },
            {raw: true}
        )
        //check if quantity ordered is allowed for each item
        for(const item of order_tray){
            const inventory = await Inventory.findOne({where: {id: item.id, deleted: false}})
            if(inventory){
                const product = await Product.findOne({where:{id: inventory.ProductId, deleted: false}})
                 if(Number(product.quantity_available) < Number(item.quantity_ordered) ){
                    return{
                        error: true,
                        message: `Quantity ordered for ${product.name} is more than available stock of ${product.quantity_available}`,
                        data: null 
                    }
                }
            } else{
                const product = await Product.findOne({where:{id: item.id}})
                console.log(product);
                if(Number(product.quantity_available) < Number(item.quantity_ordered) ){
                    return{
                        error: true,
                        message: `Quantity ordered for ${product.name} is more than available stock of ${product.quantity_available}`,
                        data: null 
                    }
                }

            }

        }
        for(const item of order_tray){
            const inventory = await Inventory.findOne({where: {id: item.id, deleted: false}})
            const product = await Product.findOne({where:{id: item.id, deleted: false}})
            if(inventory){
                const merchant = await Merchant.findOne({where: {id: inventory.inventory_owner}})
                var stock_left = Number(inventory.quantity_available)-Number(item.quantity_ordered)
                await Product.update(
                    {
                        images: inventory.images,
                        quantity_available: stock_left
                     },
                    {where:{
                            id: inventory.ProductId, 
                            deleted: false
                        }
                    }
                )
                await Inventory.update(
                    {
                        images: inventory.images,
                        quantity_available: stock_left 
                    },
                    {where:{
                            ProductId: inventory.ProductId, 
                            deleted: false
                        }
                    }
                )
                const updatedProduct = await Product.findOne({
                    where: {id: inventory.ProductId, deleted: false}
                })
                if(Number(updatedProduct.quantity_available) === 0){
                   await Inventory.update(
                        {
                            images: inventory.images,
                            status: 'out of stock',
                        },
                        {where:{ProductId: updatedProduct.id, deleted: false}}
                    ) 
                    await Product.update(
                        {
                            images: inventory.images,
                            status: 'out of stock'
                         },
                        {where:{id: updatedProduct.id, deleted: false}}
                   )
                } else {
                    await Inventory.update(
                        {
                            images: inventory.images,
                            quantity_available: stock_left
                        },
                        {where:{ProductId: updatedProduct.id, deleted: false}}
                    ) 
                }
                const resale_cut = (Number(inventory.price) - Number(updatedProduct.price))
                const ordered_item = await OrderedItem.create({
                    ProductId: updatedProduct.id,
                    product_name: updatedProduct.name,
                    images: updatedProduct.images,
                    quantity_ordered: Number(item.quantity_ordered),
                    price: Number(inventory.price),
                    total: (Number(inventory.price))*(Number(item.quantity_ordered)),
                    OrderId:newOrder.id,
                    MerchantId: updatedProduct.MerchantId,
                    resale: true,
                    resale_profit: resale_cut * (Number(item.quantity_ordered)),
                    profit_owner: inventory.inventory_owner
                })

                //Add Merchant to potential customer list
                const existingCustomer = await Customer.findOne({where:{customer_id: merchant.id}})
                if(!existingCustomer){
                    const customer = await Customer.create({
                        customer_id: merchant.id,
                        customer_name: merchant.business_name,
                        customer_contact: merchant.phone_number,
                        customer_address: merchant.address,
                        user_id: user.id
                    })
                customers.push(customer)
                }
                
                finalOrderedItems.push(ordered_item)
                const orderId = ordered_item.id
                ordered_items_ids.push(orderId)
                total_price += Number(ordered_item.total)
            }else if(product){ 
                const merchant = await Merchant.findOne({where: {id: product.MerchantId}})
                var stock_left = Number(product.quantity_available)-Number(item.quantity_ordered)
                await Product.update(
                    {
                        quantity_available: stock_left,
                        images: product.images
                    },
                    {where:{id: product.id, deleted: false}}
                )
                
                await Inventory.update(
                    {
                        images: product.images,
                        quantity_available:stock_left
                     },
                    {where:{ProductId: product.id, deleted: false}}
                )

                const updatedProduct = await Product.findOne({
                    where: {id: item.id}
                })
                if(Number(updatedProduct.quantity_available) === 0){
                   await Product.update(
                        {
                            images: product.images,
                            status: 'out of stock' 
                        },
                        {where:{id: product.id, deleted: false}}
                   )
                   await Inventory.update(
                        {
                            images: product.images,
                            status: 'out of stock'
                         },
                        {where:{ProductId: product.id, deleted: false}}
                   ) 
                }
                const ordered_item = await OrderedItem.create({
                    ProductId: product.id,
                    product_name: product.name,
                    images: product.images,
                    quantity_ordered: Number(item.quantity_ordered),
                    price: Number(product.price),
                    total: (Number(product.price))*(Number(item.quantity_ordered)),
                    OrderId:newOrder.id,
                    MerchantId: product.MerchantId,
                })

                //Add Merchant to potential customer list
                const existingCustomer = await Customer.findOne({where:{customer_id: merchant.id}})
                if(!existingCustomer){
                    const customer = await Customer.create({
                        customer_id: merchant.id,
                        customer_name: merchant.business_name,
                        customer_contact: merchant.phone_number,
                        customer_address: merchant.address,
                        user_id: user.id
                    })
                    customers.push(customer)
                }
                
                finalOrderedItems.push(ordered_item)
                const orderId = ordered_item.id
                ordered_items_ids.push(orderId)
                total_price += Number(ordered_item.total)
        }   }
        const tracking_id = 'AM'+randomString()


        await Order.update(
            {
                items: ordered_items_ids,
                order_cost: total_price,
                trackingId: tracking_id,
                delivery_date:deliveryDate()
            },
            {where: {id:newOrder.id, deleted: false}}
        )
        const placedOrder = await Order.findOne({
            attributes: {exclude:['deleted']},
            where:{id:newOrder.id, deleted: false}
        })
        const tracker = await Tracker.create(
        {
            trackingId:tracking_id,
            OrderId: newOrder.id
        },
        {raw: true}
        )
     
        const orderPlaced = {
            id: placedOrder.id,
            items_in_order: finalOrderedItems,
            is_paid: placedOrder.isPaid,
            payment_type: placedOrder.payment_type,
            total: placedOrder.order_cost,
            delivery_type: placedOrder.delivery_type,
            delivery_address: placedOrder.delivery_address,
            delivery_date: placedOrder.delivery_date,
            tracking_id: placedOrder.trackingId
        }
        //send mail to customer
        const customerMail = await sendOrderDetailstoMail({
            email: user.email,
            fullName: user.fullName,
            order: {...orderPlaced},
            items: ordered_items_ids
        })

        // send Mail to Merchant
        const merchantMail = await sendMailToMerchant({
            productIds: ordered_items_ids
        })
        //Assemble payment details
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
        
        //Initiate customer withdrawal
        const withdrawal = await initiateWithdrawal({
            orderId: placedOrder.id,
            tx_ref: paymentDetails.tx_ref,
        })
        return {
            error: false,
            message: "Order created successfully",
            data: {
                orderPlaced, 
                tracker, 
                customerEmailResponse: customerMail.message,
                merchantMailResponse: merchantMail.data,
                paymentDetails: paymentDetails,
                withdrawalDetails: withdrawal,
                customers: customers

            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to create an Order at the moment",
            data: null
        }
        
    }
}

exports.cancelOrder = async (user, data) =>{
    try {
        const existingOrder = await Order.findOne({
            where:{
                id: data.id,
                UserId: user.id,
                deleted: false
            }
        })

        if(!existingOrder){
            return{
                error: true,
                message: 'Cannot find specified Order',
                data: null
            }
        }
        await Order.update(
            {
                items:existingOrder.items,
                status: "canceled",
            },
            {where:{id: existingOrder.id,}}
        )
         const canceledOrder = await Order.findOne({
            where:{
                id: existingOrder.id,
                UserId: user.id,
                deleted: false
            }
        })

     
        return {
            error: false,
            message: "Order canceled successfully",
            data: canceledOrder
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to cancel order at the moment",
            data: null
        }
        
    }
}

exports.getMyOrders = async (user) =>{
    try {
        const activeOrders = []
        const canceledOrders = []
        const deliveredOrders = []
        const disputedOrders = []


        const myOrders = await Order.findAll({
            attributes: {exclude:[
             'items',
             'TrackerId',
             'deleted' 
            ]},
            where:{
                UserId: user.id,
                deleted: false
            },
            order: [
                ['created_at', 'DESC'],
            ],
        })

        if(Number(myOrders.length) < 1 ){
            return {
            error: false,
            message: "Orders Retrieved successfully",
            data: {
                active_orders: [],
                canceled_orders: [],
                delivered_orders: [],
                disputed_orders: []
            }
        }
        }

          for(const order of myOrders){
            if(String(order.status) === "active"){
                activeOrders.push(order)
            }else if(String(order.status) === "canceled") {
                canceledOrders.push(order)
            } else if (String(order.status) === "delivered"){
                deliveredOrders.push(order)
            } else if (String(order.status) === "disputed") {
                disputedOrders.push(order)
            }

          }
        
        
        return {
            error: false,
            message: "Orders Retrieved successfully",
            data: {
                active_orders: activeOrders,
                canceled_orders: canceledOrders,
                delivered_orders: deliveredOrders,
                disputed_orders: disputedOrders
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retrieve orders at the moment",
            data: null
        }
        
    }
}

exports.getSingleOrder = async (user, data) =>{
    try {
        const singleOrder = await Order.findOne({
            attributes:{exclude:[ 'TrackerId', 'deleted']},
            where:{
                id: data.id,
                UserId: user.id
            }
        })
        const orderedItems = singleOrder.items
        let orderTray = []
        for(const item of orderedItems){
            const order_item = await OrderedItem.findOne({where:{id: item, deleted: false}})
            orderTray.push(order_item)
        }
        return {
            error: false,
            message: "single order fetched successfully",
            data: {order:singleOrder, orderedItems:orderTray}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to fetch single order at the moment",
            data: null
        }
        
    }
}

exports.trackMyOrder = async(data) =>{
    try {
        const {
            user_id,
            tracking_id
        } = data
        const upper = String(tracking_id).toUpperCase()

        const foundOrder = await Order.findOne({
            where:{
                trackingId : {[Op.like]: `%${upper}%`},
                UserId: user_id
            },
            order: [
                ['created_at', 'DESC'],
            ],
        })

        if(!foundOrder) {
            return {
                error: false,
                message: "No Results for tracking IDs entered",
                data: null
            }
        } else if (String(foundOrder.status) === "canceled"){
            return {
                error: false,
                message: "The resulting order has already been canceled",
                data: null
            }
        }

        const tracker = await Tracker.findOne({
            where:{trackingId: foundOrder.trackingId}
        })

        const trackedOrder = {
            tracking_id: foundOrder.trackingId,
            order_status: foundOrder.status,
            total_cost: foundOrder.order_cost,
            delivery_date: foundOrder.delivery_date,
            delivery_address: foundOrder.delivery_address,
            tracking_status: tracker.status,
            date_created: foundOrder.created_at
        }

        return {
            error: false,
            message: "tracking information retrieved successfully",
            data: trackedOrder
        }
        
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve tracking information at the moment",
            data: null
        }
    }
}