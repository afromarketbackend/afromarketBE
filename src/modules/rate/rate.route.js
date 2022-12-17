const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 createRateCardController, updateRateCardController, getAllRateCardController
} = require('./rate.controller')
const {
singleModelSchema,
getAllProductSchema,
inventoryPriceSchema,
searchInventorySchema,
createRateCardSchema
} = require('./rate.schema')

const router = Router()


router.post(
    '/create',
    authorize(),
    validateRequest(createRateCardSchema, "body"),
    createRateCardController 
)

router.patch(
    '/update/:id',
    authorize(),
    updateRateCardController
)

router.get(
    '/all',
    authorize(),
    getAllRateCardController
)

module.exports = router