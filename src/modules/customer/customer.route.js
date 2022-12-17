const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
getMyCustomersController, viewACustomerController
} = require('./customer.controller')
const {
singleModelSchema,
getAllProductSchema,
inventoryPriceSchema,
searchInventorySchema
} = require('./customer.schema')

const router = Router()


router.get(
    '/my-all',
    validateRequest(getAllProductSchema, "query"),
    authorize(),
    getMyCustomersController 
)

router.get(
    '/view/:id',
    validateRequest(singleModelSchema, "params"),
    authorize(),
    viewACustomerController 
)

module.exports = router