const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {getPaginatedRecords} = require('../../../common/helpers/paginate')

const {
    sequelize,
    Product,
    Inventory,
    Merchant,
    Review
} = models

exports.getAllProducts = async (data) =>{
    try {
        const {limit, page} = data
        const allProducts = await getPaginatedRecords(Product, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "name", "picture", "quantity_available", "description", "ratings", "price", 'isapproved', 'status']
        })
        return {
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: allProducts,
                pagination: allProducts.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product at the moment",
            data: null
        }
        
    }
}


exports.getAProductByAdmin = async(id)=>{
    try {

        const product = await Product.findOne({
            where:{id}
        })
        const merchant = await Merchant.findOne({
            attributes: ["business_name","email", "phone_number","ratings"],
            where:{id: product.MerchantId}
        })
        
        const reviews = await Review.findAll({
            where: {ProductId: product.id}
        })

        const singleProduct = {
            viewedProduct: product,
            seller: merchant,
            allReviews: reviews

        }
        return{
            error: false,
            message: "Product retreived successfully",
            data: singleProduct
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: "Unable to retreive product at the moment",
            data:error
        }
    }
}

exports.flagProductByAdmin = async(id)=>{
    try {

        const product = await Product.findOne({
            where:{id, deleted: false}
        })
        if(!product){
            return{
                error: true,
                message: "product not found",
                data:error
            }
        }
        if(Boolean(product.isapproved) === true){
            await Product.update({isapproved: false},{where: {id:product.id}})
            const updatedProduct = await Product.findOne({where:{id}})
            return{
                error: false,
                message: "Product disapproved successfully",
                data:updatedProduct
            }
        }else {
            await Product.update({isapproved: true},{where: {id:product.id}})
            const updatedProduct = await Product.findOne({where:{id}})
            return{
                error: false,
                message: "Product disapproved successfully",
                data:updatedProduct

            }
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: "Unable to retreive product at the moment",
            data:error
        }
    }
}