const models = require('../../db/models')
var Sequelize = require('sequelize')
const { getPaginatedRecords, paginateRaw } = require('../../common/helpers/paginate')

const {
    sequelize,
    Product,
    Rate,
    Customer,
    Inventory,
    Merchant
} = models
exports.createRateCard = async (payload) =>{
    try {

        const {country, state, region, price, currency} = payload
        
        const existingRate = await Rate.findOne({
            where:{
                country: country,
                state: state,
                region: region,
                price: price,
                deleted: false
            }
        })
        if(existingRate){
            return {
                error: true,
                message: "A Rate already Created for this region, try perhaps updating",
                data: null
            }
        }
        const newRate = await Rate.create({
            country,
            state,
            region,
            price: Number(price),
            currency: currency? currency: "NGN"
        })

        return {
            error: false,
            message: "New Rate Card Created successfully",
            data: newRate
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to create an Rate Card at the moment",
            data: null
        }
        
    }
}

exports.updateRateCard = async (payload) =>{
    try {
        const {id, body} = payload

        const existingRate = await Rate.findOne({where:{id: id, deleted: false}})
        if(!existingRate){
            return {
                error: true,
                message: "Rate Card Not Found",
                data: null
            }
        }

        await Rate.update(
            {...body},
            {where:{id: existingRate.id}}
        )
        
        const updatedRate = await Rate.findOne({where:{id: id}})
        return {
            error: false,
            message: "Rate Card updated successfully",
            data:updatedRate
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to Rate Card at the moment",
            data: null
        }
        
    }
}

exports.getAllRateCards = async (body) =>{
    try {
        const {limit, page} = body

        const paginatedRates = await getPaginatedRecords(Rate, {
            limit: limit?Number(limit): 10,
            page: page? Number(page): 1,
            exclusions:["currency"]            
        })
        
        return {
            error: false,
            message: "Merchant rate cards retreived successfully",
            data: {
                rates: paginatedRates,
                pagination: paginatedRates.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive Reviews of this merchant at the moment",
            data: null
        }
        
    }
}
