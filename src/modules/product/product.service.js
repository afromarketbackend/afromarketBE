const models = require('../../db/models')
var Sequelize = require('sequelize')
const {fileUploader} = require('../../common/helpers/cloudImageUpload')
const {getPaginatedRecords} = require('../../common/helpers/paginate')
var uri2path = require('file-uri-to-path');

const {
    sequelize,
    Category,
    Product,
    Inventory
} = models

exports.uploadProduct = async (payload) =>{
    try {
        const {
            user,
            name,
            description,
            quantity_available,
            specific_details,
            price,
            category_id,
            files
        } = payload
        const imageArray = []
        const existingProduct = await Product.findOne({
            where:{
                MerchantId: user.id,
                name: name,
                deleted: false
            }
        })

        const category = await Category.findOne({where:{id: category_id}})

        if(existingProduct){
            return{
                error: true,
                message: 'You already uploaded a product with same name',
                data: null
            }
        }
        const newProduct= await Product.create(
            {
                name: String(name).toLowerCase(),
                description,
                specific_details: specific_details? specific_details: {},
                quantity_available: Number(quantity_available),
                price: Number(price),
                CategoryId: category_id,
                category: category.name,
                MerchantId:user.id,           
            },
            {raw: true}
        )
        for(const file of files){
             const {path, uri} = file
             const string = path?path: await uri2path(uri)
            const url = await fileUploader(string)
            imageArray.push(url)
        }
        if(imageArray.length > 0){
            await Product.update(
                {   
                    images: imageArray,
                },
                {
                    where:{id: newProduct.id}
                }
            )
        }
        
       
        const fullProduct = await Product.findOne({where:{id: newProduct.id}})
        return {
            error: false,
            message: "Product uploaded successfully",
            data: fullProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to upload product at the moment",
            data: null
        }
        
    }
}


exports.getSingleProductByAUser = async (data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                id: (data.id),
                deleted: false
            }
        })

        if(!existingProduct){
            return{
                error: true,
                message: 'Cannot find selected product',
                data: null
            }
        }
        return {
            error: false,
            message: "Product retreived successfully",
            data: existingProduct
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

exports.getSingleProductByAMerchant = async (data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                id: (data.id),
                deleted: false
            }
        })

        if(!existingProduct){
            return{
                error: true,
                message: 'Cannot find selected product',
                data: null
            }
        }

        const allInventoriesOfAProduct = await Inventory.findAll({
            where:{
                ProductId: data.id,
                deleted: false
            }
        })
        return {
            error: false,
            message: "Product retreived successfully",
            data: {existingProduct, allInventoriesOfAProduct}
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


exports.getAllProducts = async (data) =>{
    try {
        const {limit, page} = data

        const allProducts = await getPaginatedRecords(Product, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "name", "images", 'quantity_available', "description", "ratings", "price", "category", "CategoryId"]
        })
        if(allProducts.length < 1){
            return {
            error: false,
            message: "Product retreived successfully",
            data: {
                allProducts: [],
                pagination: 0
            }
        }
        }
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


exports.removeProduct = async (user, data) =>{
    try {
        const existingProduct = await Product.findOne({
            where:{
                MerchantId: user.id,
                id: (data.id),
                deleted: false
            }
        })

        if(!existingProduct){
            return{
                error: true,
                message: 'Cannot find selected product',
                data: null
            }
        }
        await Product.update(
                {deleted: true},
                {
                    where:{
                        id: (data.id),
                        MerchantId:user.id
                    }   
                }
            )
            const deletedProduct = await Product.findOne({
                where:{
                    MerchantId: user.id,
                    id:(data.id)
                }
            })
        return {
            error: false,
            message: "Product removed successfully",
            data: deletedProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to remove product at the moment",
            data: null
        }
        
    }

}

exports.getMyProductsByMerchant = async (data) =>{
    try {
        const {merchant_id, limit, page} = data
        const allProducts = await getPaginatedRecords(Product, {
            limit: Number(limit),
            page: Number(page),
            data: {MerchantId: merchant_id},
            selectedFields: ["id", "name", "images", 'quantity_available', "description", "ratings", "price", "category", "CategoryId"]
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

exports.getAlllProductsByMerchant = async (data) =>{
    try {
        const {merchant_id, limit, page} = data
        const allProducts = await getPaginatedRecords(Product, {
            limit: Number(limit),
            page: Number(page),
            data: {MerchantId: merchant_id},
            selectedFields: ["id", "name", "images", 'quantity_available', "description", "ratings", "price", "category", "CategoryId"]
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

exports.editAllProducts = async () => {
    try {
        const results = []
       const allProducts = await Product.findAll() 
       if(allProducts.length < 1) {
        return {
            error: false,
            message: "No product found",
            data: []
        }
       }
       for(const prod of allProducts){
            const cat = await Category.findOne({where:{id:prod.CategoryId}})
            await Product.update(
                {
                    images: prod.images,
                    category: cat.name
                },
                {where: {deleted: false}}
            )
            const product = await Product.findOne({where:{id: prod.id}})
            results.push(product)
       }

       return {
            error: false,
            message: "Products retreived successfully",
            data: results
       }


    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to edit product at the moment",
            data: null
        }
    }
}

exports.updateAProduct = async (payload) =>{
    try {
        const {
            id,
            user,
            name,
            description,
            quantity_available,
            specific_details,
            price,
            category_id,
            files
        } = payload
        const imageArray = []
        var category
        const existingProduct = await Product.findOne({
            where:{
                MerchantId: user.id,
                id: id,
                deleted: false
            }
        })
        if (category_id !== (null|| undefined)){
            category = await Category.findOne({where:{id: category_id}})
        }

        if(!existingProduct){
            return{
                error: true,
                message: 'Product Not Found',
                data: null
            }
        }

        if(files.length > 0){
            for(const file of files){
                const {path, uri} = file
                const string = path?path:uri
                const url = await fileUploader(string)
                imageArray.push(url)
            }
        }
        await Product.update(
            {
                name: name? String(name).toLowerCase(): existingProduct.name,
                description: description? description: existingProduct.description,
                images: (files.length>0)? imageArray: existingProduct.images,
                specific_details: specific_details? specific_details: existingProduct.specific_details,
                quantity_available:quantity_available? Number(quantity_available): existingProduct.quantity_available,
                price: price?Number(price): existingProduct.price,
                CategoryId: category? category.id: existingProduct.CategoryId,
                category:category? category.name: existingProduct.category,
            },
            {where:{id:existingProduct.id}}
        )
               
       
        const updatedProduct = await Product.findOne({where:{id: existingProduct.id}})
        return {
            error: false,
            message: "Product updated successfully",
            data: updatedProduct
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to update product at the moment",
            data: null
        }
        
    }
}
