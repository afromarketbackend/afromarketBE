const models = require('../../db/models')
var Sequelize = require('sequelize')
const imageUploader = require('../../common/helpers/cloudImageUpload')
const {getPaginatedRecords, paginateRaw, getPaginatedRecordsForMultipleModels} = require('../../common/helpers/paginate')
const {searchModel} = require('../../common/helpers/search')

const {
    sequelize,
    Category,
    Product,
    Inventory
} = models

exports.addCategory = async (payload) =>{
    try {
        const {admin, body} = payload
        const existingCategory = await Category.findOne({
            where: {name: body.name}
        })
        if(existingCategory){
            return{
                error: true,
                message: "Category already exists",
                data: null
            }
        }
        const newCategory = await Category.create({
            ...body,
            created_by: admin.email
        })
        return {
            error: false,
            message: "Categories retreived successfully",
            data: newCategory
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive categories at the moment",
            data: null
        }
        
    }
}

exports.getACategory = async (id) =>{
    try {
        const existingCategory = await Category.findOne({
            where: {id}
        })
        if(!existingCategory){
            return{
                error: true,
                message: "Category not found",
                data: null
            }
        }
        return {
            error: false,
            message: "Categories retreived successfully",
            data: existingCategory
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive category at the moment",
            data: null
        }
        
    }
}

exports.getAllCategories = async (data) =>{
    try {
        const {limit, page} = data
        const allCategories = await getPaginatedRecords(Category, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "name",  "description"]
        })
        return {
            error: false,
            message: "Categories retreived successfully",
            data: {
                allCategories: allCategories,
                pagination: allCategories.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive categories at the moment",
            data: null
        }
        
    }
}

exports.uploadProductImages = async(payload)=>{
    try {
        const {product_id, file} = payload
        const url = await imageUploader(file)
        if(!url){
            return{
                code: 400,
                status: "error",
                message: "failed to upload product image",
                data: null
            }
        }
        await Product.update(
            {picture: url},
            {where:
                {
                    id:product_id,
                    deleted: false
                },
                
            }
        )
        const updatedProduct = await Product.findOne({id: product_id})
        return{
            error: false,
            message: "Image upload successful",
            data: updatedProduct
        }

    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: "Unable to upload image at the moment",
            data:error
        }
    }


}

// exports.getAllProductsInACategory = async (data) =>{
//     try {
//         const {limit, page, category_id} = data
//         let allResults = []
//         const inventories = await Inventory.findAll({
//             where:{CategoryId: category_id},
//             order: [
//              ["created_at", "DESC"],
//             ],
//         })

//         const products = await Product.findAll({
//             where:{CategoryId: category_id},
//             order: [
//              ["created_at", "DESC"],
//             ],
//         })
//         for(const item of products){
//             allResults.push(item)
//         }
//         for(const item of inventories){
//             allResults.push(item)
//         }
//         const arranged = allResults.sort(function(a, b) {
//             var keyA = new Date(a.updated_at),
//                 keyB = new Date(b.updated_at);
//             // Compare the 2 dates
//             if (keyA < keyB) return -1;
//             if (keyA > keyB) return 1;
//             return 0;
//         })
//         const display = await paginateRaw(arranged,{limit, page})
//         return{
//             error: false,
//             message: "Product retreived successfully",
//             data: {
//                 allProducts: display,
//                 // pagination: allResults.perPage
//             }
//         }

//     } catch (error) {
//         console.log(error)
//         return{
//             error: true,
//             message: error.message|| "Unable to retreive products under this category at the moment",
//             data: null
//         }
        
//     }
// }

exports.getAllProductsInACategory = async (data) =>{
    try {
        const {limit, page, category_id} = data
        const categorisedProducts = await getPaginatedRecordsForMultipleModels(
            Product, Inventory,
            {
                limit: limit? Number(limit):10 , 
                page: page?Number(page):1, 
                data: {CategoryId: category_id},
                exclusions: ["updated_at"]
            }
        )
        return{
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: categorisedProducts,
                pagination: categorisedProducts.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive products under this category at the moment",
            data: null
        }
        
    }
}

exports.searchCategory = async (data) =>{
    try {
        const {limit, page, search} = data
        const results = await searchModel(Category, {
            limit:Number(limit), 
            page:Number(page), 
            searchField: search
        })
        // removing the raw array from the returned result of the search
        delete results.array
        return{
            error: false,
            message: "category retreived successfully",
            data: {
                result: results,
                pagination: results.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive products under this category at the moment",
            data: null
        }
        
    }
}

