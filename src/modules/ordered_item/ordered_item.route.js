const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
getSingleOrderedItemController,
getAllOrderedItemsOfAnOrderController,
} = require('./ordered_item.controller')
const {
 singleItemSchema,
 singleOrderSchema
} = require('./ordered_item.schema')

const router = Router()

router.get(
    '/get_one/:id/:item_id',
    validateRequest(singleItemSchema, "params"),
    authorize(),
    getSingleOrderedItemController
)

router.get(
    '/all_items/:id',
    validateRequest(singleOrderSchema, "params"),
    authorize(),
    getAllOrderedItemsOfAnOrderController
)


module.exports = router