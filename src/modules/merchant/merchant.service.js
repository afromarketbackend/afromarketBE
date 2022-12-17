const models = require('../../db/models')
var Sequelize = require('sequelize')
const {fileUploader} = require('../../common/helpers/cloudImageUpload')
const {hashPassword, comparePassword} = require('../../common/helpers/password')
const {jwtSign} = require('../../common/helpers/token')
const cloudinary = require('../../common/config/cloudinary')
var uri2path = require('file-uri-to-path');
const { getPaginatedRecords } = require('../../common/helpers/paginate')
const {
    sequelize,
    Merchant,
    Product,
    Review
} = models

exports.registerMerchant = async (data) =>{
    try {
        const {
            business_name,
            business_description,
            business_type,
            email,
            inputedPassword,
            phone_number,
            address,
            bank_name,
            account_name,
            account_number,
            bank_verification_number,
            tax_id_number,
            files
        } = data
        let password
        if(inputedPassword){
            password = hashPassword(inputedPassword)
        }
        const existingMerchant = await Merchant.findOne({
            where:{
                email: data.email,
                deleted: false
            }
        })

        if(existingMerchant){
            return{
                error: true,
                message: 'Email already registered on the server',
                data: null
            }
        }
        const newMerchant = await Merchant.create(
            {
                business_name: business_name? business_name: null,
                business_description: business_description? business_description: null,
                business_type: business_type? business_type: "public limited company",
                tax_id_number: tax_id_number? tax_id_number: null,
                email: email? email: null,
                password: inputedPassword? password: null,
                phone_number: phone_number? phone_number: null,
                address: address? address: null,
                bank_name: bank_name? bank_name: null,
                account_name: account_name? account_name: null,
                account_number: account_number? account_number: null,
                bank_verification_number: bank_verification_number? bank_verification_number: null,

            },
            {raw: true}
        )
        const uploadUrls = []
        // upload docs
        console.log(data);
        for(const file of files) {
            const {path, uri} = file
            const string = path?path:uri2path(uri)
            const url = await fileUploader(string)
            uploadUrls.push(url)
        }


        await Merchant.update(
            {
                cac_document: uploadUrls[0],
                brand_image: uploadUrls[1]
            },
            {
             where: {id: newMerchant.id}
            }
        )
        const updatedMerchant = await Merchant.findOne({
            attributes:{exclude:['password', 'deleted']},
            where: {id: newMerchant.id}
        })
        return {
            error: false,
            message: "merchant registered successfully",
            data: updatedMerchant
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to register user at the moment",
            data: null
        }
        
    }
}

exports.loginMerchant = async(user, data) => {
    try {
        if(data.password){
            const passwordMatch = await comparePassword(user.password, data.password)
            if (!passwordMatch) {
                return {
                    error: true,
                    message: "Incorrect password.",
                };
            }
        }
         if(!data.password && !data.auth_type){
            return {
                error: true,
                message: "Invalid Authorization",
            };
        }

        const refreshToken = jwtSign(user.id)
        await Merchant.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id, deleted: false}}
        )
        const loginMerchant = await Merchant.findOne({
            attributes:['email','business_name', 'id', 'phone_number'],
            where: {id:user.id, deleted: false}
        })

        return{
            error: false,
            message: 'Login successful',
            data: {loginMerchant, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in merchant at the moment",
            data: null
        }
    }
}



exports.getAllMerchants = async(data) => {
    try {
        const {limit, page} = data
        const allMerchants = await getPaginatedRecords(Merchant,{
            limit: Number(limit),
            page: Number(page),
            selectedFields: ['id', 'business_name', 'email', 'ratings', 'phone_number', 'brand_image', 'address']
        })
        if(allMerchants.data.length < 1) {
            return {
                error: false,
                message: "No merchants at the moment",
                data: {
                    allMerchants:[],
                    pagination: 0
                }
            }
        }
        return {
            error: false,
            message: "Merchants retreived successfully",
            data: {
                allMerchants: allMerchants,
                pagination: allMerchants.perPage
            }
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Error retreiving merchants at the moment",
            data: null
        }
    }
}

exports.viewAMerchant = async (data) => {
    try {
       const {
        merchant_id
       } = data 

       const merchant = await Merchant.findOne({where:{id:merchant_id}})
       if(!merchant){
            return {
                error: false,
                message:"Merchant not found",
                data: null
            }
       }
       const generalReviews = []
       const allMerchantProducts = await Product.findAll({where:{MerchantId: merchant.id}})
       if(allMerchantProducts.length >0){
            for(const prods of allMerchantProducts){
                const reviews = await Review.findAll({where:{ProductId:prods.id}})
                generalReviews.push(...reviews)
            }
       }
       return {
        error: false,
        message: "Merchant retrieved successfully",
        data:{
            merchant,
            no_of_reviews: generalReviews.length,
            reviews: generalReviews
        }
       }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message ||"Unable to view merchant at the moment",
            data: null
        }
        
    }
}
