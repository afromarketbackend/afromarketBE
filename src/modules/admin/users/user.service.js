const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {getPaginatedRecords, paginateRaw} = require('../../../common/helpers/paginate')
const {Op} = Sequelize
const {
    sequelize,
    User
} = models

exports.getAllUsers = async (data) =>{
    try {
        const {limit, page} = data
        const allusers = await getPaginatedRecords(User, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "fullName", "email", "phone_number", "isVerified", 'isBlocked', 'delivery_address']
        })

        return {
            error: false,
            message: "Users retreived successfully",
            data: {
                allUsers: allusers,
                pagination: allusers.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive users at the moment",
            data: null
        }
        
    }
}

exports.searchForUserByAdmin = async (data) =>{
    try {
        const {search} = data
        const result = await User.findAll({
            where: {
                email: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), 'LIKE', '%' + search + '%')
            },
        }) 
        return {
            error: false,
            message: "User retreived successfully",
            data: result
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive user at the moment",
            data: null
        }
        
    }
}

exports.getOneUserByAdmin = async (id) =>{
    try {
        const user = await User.findOne({
            attributes:{exclude:['password']},
            where: {id: id},
        }) 
        if(!user){
            return {
                error: true,
                message: "User not found",
                data: null
            }
        }

        return {
            error: false,
            message: "User retreived successfully",
            data: user
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive user at the moment",
            data: null
        }
        
    }
}

exports.getNewUsersByAdmin = async (data) =>{
    try {
        const{startDate, endDate, limit, page} = data

        const newUsers = await User.findAll({
            where:{    
                created_at:{[Op.between]:[
                    startDate,
                    endDate
                ]}
            }
        })
        const actives = await paginateRaw(newUsers,{
            limit: Number(limit),
            page: Number(page)
        })

          return {
            error: false,
            message: "new users retreived successfully",
            data:actives
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive new users at the moment",
            data: null
        }
        
    }
}


exports.flagUserByAdmin = async(id)=>{
    try {

        const user = await User.findOne({
            where:{id, deleted: false}
        })
        if(!user){
            return{
                error: true,
                message: "user not found",
                data:error
            }
        }
        if(Boolean(user.isBlocked) === true){
            await User.update({isBlocked: false},{where: {id:user.id}})
            const updatedUser = await User.findOne({where:{id}})
            return{
                error: false,
                message: "User unblocked successfully",
                data:updatedUser
            }
        }else {
            await User.update({isBlocked: true},{where: {id:user.id}})
            const updatedUser = await User.findOne({where:{id}})
            return{
                error: false,
                message: "User Blocked successfully",
                data:updatedUser
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