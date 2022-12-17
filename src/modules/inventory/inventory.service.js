const models = require('../../db/models')
var Sequelize = require('sequelize')
const { getPaginatedRecords, paginateRaw } = require('../../common/helpers/paginate')
const {searchModel} = require('../../common/helpers/search')

const {
    sequelize,
    Product,
    Inventory
} = models

exports.addProductToInventory = async (data) =>{
    try {
        const {merchant_id, product_id, payload} = data
        const existingProduct = await Product.findOne({
            where:{
                id: product_id,
                deleted: false
            },
        })
        const existingInventory = await Inventory.findOne({
            where:{
                inventory_owner: merchant_id,
                MerchantId: existingProduct.MerchantId,
                name: existingProduct.name,
                deleted: false
            }
        })


        if(!existingProduct){
            return{
                error: true,
                message: 'Product not found',
                data: null
            }
        } 
        if((String(existingProduct.MerchantId) === merchant_id) || existingInventory){
            return{
                error: true,
                message: "Product already part of your inventory",
                data: null
            }
        }
        if (Number(existingProduct.price) > Number(payload.price)){
            return {
                error: true,
                message: 'Proposed price less than original product price',
                data: null
            }
        }
        const newInventory= await Inventory.create(
            {
                name: existingProduct.name,
                ProductId: existingProduct.id,
                description: existingProduct.description,
                specific_details: existingProduct.specific_details,
                images:'',
                quantity_available: existingProduct.quantity_available,
                price: payload.price,
                isApproved: existingProduct.isApproved,
                ratings: existingProduct.ratings,
                MerchantId: existingProduct.MerchantId,
                CategoryId: existingProduct.CategoryId,
                status: existingProduct.status,
                inventory_owner: merchant_id 
            },
            {raw: true}
        )
        await Inventory.update(
            {images: existingProduct.images},
            {where:{id:newInventory.id}}

        )
        const update = await Inventory.findOne({where: {id: newInventory.id}})
        return {
            error: false,
            message: "Product added to inventory successfully",
            data: update
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to add product to inventory at the moment",
            data: null
        }
        
    }
}



exports.singleInventoryItem = async (payload) =>{
    const {inventory_id, inventory_owner} = payload
    try {
        const existingInventory = await Inventory.findOne({
            where:{
                id: inventory_id,
                inventory_owner,
                deleted: false
            },
        })


        if(!existingInventory){
            return{
                error: true,
                message: 'Product not found under your inventories',
                data: null
            }
        } 

        return {
            error: false,
            message: "Product retreived from your inventory successfully",
            data: existingInventory
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive product from your inventory at the moment",
            data: null
        }
        
    }
}


exports.removeProductFromInventory = async (payload) =>{
    const {inventory_id, inventory_owner} = payload
    try {
        const existingInventory = await Inventory.findOne({
            where:{
                id: inventory_id,
                inventory_owner,
                deleted:false
            }
        })


        if(!existingInventory){
            return{
                error: true,
                message: 'Product not found under your inventories',
                data: null
            }
        } 
        await Inventory.update(
            {deleted: true, images: existingInventory.images},
            {
            where:{
                id: inventory_id,
                inventory_owner
            }   
        })

        return {
            error: false,
            message: "Product removed from your inventory successfully",
            data: null
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to remove product from your inventory at the moment",
            data: null
        }
        
    }
}

exports.allMyInventories = async (payload) =>{
    const {inventory_owner, limit, page} = payload
    try {
         const myInventories = await getPaginatedRecords(Inventory, {
            limit: limit? Number(limit):10,
            page:page? Number(page):1,
            data: {inventory_owner},
            selectedFields: ["id", "name", "images", "description", "ratings", "price", "MerchantId"]

        })

        return {
            error: false,
            message: "Inventories retreived successfully",
            data: {
                allInventories: myInventories,
                pagination: myInventories.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to remove product from your inventory at the moment",
            data: null
        }
        
    }
}

exports.allInventories = async (payload) =>{
    const { limit, page} = payload
    try {
         const myInventories = await getPaginatedRecords(Inventory, {
            limit: Number(limit),
            page: Number(page),
            data: {},
            selectedFields: ["id", "name", "picture", "description", "ratings", "price", "MerchantId", "inventory_owner"]

        })

        return {
            error: false,
            message: "Inventories retreived successfully",
            data: {
                allInventories: myInventories,
                pagination: myInventories.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to remove product from your inventory at the moment",
            data: null
        }
        
    }
}


exports.searchInventory = async (data) =>{
    try {
        const {limit, page, search} = data
        const inventoryResult = await searchModel(Inventory, {
            limit:Number(limit), 
            page:Number(page), 
            searchField: search
        })

        const productResult= await searchModel(Product, {
            limit:Number(limit), 
            page:Number(page), 
            searchField: search
        })
        const inventoryArray = inventoryResult.array
        const productArray = productResult.array
        const results = inventoryArray.concat(productArray)

        const paginatedRecords = await paginateRaw(results, {limit, page})

        return{
            error: false,
            message: "products retreived successfully",
            data: {
                result: paginatedRecords,
                pagination: paginatedRecords.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive products searched for at the moment",
            data: null
        }
        
    }
}