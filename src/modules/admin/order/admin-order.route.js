const {Router} = require('express')
const {authorizeAdmin } = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const {
    getAllOrdersController,
    getOneOrderController,
    searchOrderController,
    getAllOrdersByStatusController,
    getAllDeliveredOrdersController,
    getAllDisputedOrdersController
    
} = require('./admin-order.controller')
const {
    getAllOrdersSchema,
    singleOrderSchema,
    searchSchema,
    filterSchema
} = require('./admin-order.schema')
const { getAllOrdersBySatusAdmin } = require('./admin-order.service')
const router = Router()

router.get(
    '/all',
    validateRequest(getAllOrdersSchema, "query"),
    authorizeAdmin,
    getAllOrdersController,
)

router.get(
    '/one/:id',
    validateRequest(singleOrderSchema, "params"),
    authorizeAdmin,
    getOneOrderController
)

router.get(
    '/search',
    validateRequest(searchSchema, "query"),
    authorizeAdmin,
    searchOrderController
)

router.get(
    '/by-status',
    validateRequest(filterSchema, "query"),
    authorizeAdmin,
    getAllOrdersByStatusController
)

module.exports = router
