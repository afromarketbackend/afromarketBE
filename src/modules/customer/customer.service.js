const models = require('../../db/models')
var Sequelize = require('sequelize')
const { getPaginatedRecords, paginateRaw } = require('../../common/helpers/paginate')

const {
    sequelize,
    Product,
    Customer,
    Inventory,
    Merchant
} = models

exports.getMyCustomers = async (data) =>{
    try {
        const {user, limit, page} = data
        const paginatedRecords = await getPaginatedRecords(Customer, {
            limit: limit? Number(limit): 10,
            page: page? Number(page): 1,
            data: {user_id: user.id},
            selectedFields: ['id', 'customer_id', 'customer_name', 'customer_contact', 'customer_address', 'user_id']
        })

        return {
            error: false,
            message: "Customers retrieved  successfully",
            data: {
                allCustomers: paginatedRecords,
                pagination: paginatedRecords.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to fetch customers at the moment",
            data: null
        }
        
    }
}

exports.viewACustomer = async (id) =>{
    try {
        const existingCustomer = await Customer.findOne({
            
            where:{
                id: id,
                deleted: false
            }
        })

        if(!existingCustomer){
            return {
                error: true,
                message: "Customer details not found",
                data: null
            }
        }

        const merchant = await Merchant.findOne({
            attributes:{exclude:["password"]},
            where: {id: existingCustomer.customer_id}
        })
        
        if(!merchant){
            return {
                error: true,
                message: "Merchant details not found",
                data: null
            }
        }
        return {
            error: false,
            message: "Customer retrieved  successfully",
            data: merchant
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to fetch customers at the moment",
            data: null
        }
        
    }
}

