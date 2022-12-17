const {Router} = require('express')
const {authorizeAdmin } = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const {
    getAllOrdersController,
    getOneOrderController,
    searchOrderController,
    getAllActiveOrdersController,
    getAllDeliveredOrdersController,
    getAllDisputedOrdersController
    
} = require('./admin-order.controller')
const {
    getAllOrdersSchema,
    singleOrderSchema,
    searchSchema,
    filterSchema
} = require('./admin-order.schema')
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

router.post(
    '/search',
    validateRequest(searchSchema, "body"),
    authorizeAdmin,
    searchOrderController
)

router.post(
    '/active',
    validateRequest(filterSchema, "body"),
    validateRequest(getAllOrdersSchema, "query"),
    authorizeAdmin,
    getAllActiveOrdersController
)

router.post(
    '/delivered',
    validateRequest(filterSchema, "body"),
    validateRequest(getAllOrdersSchema, "query"),
    authorizeAdmin,
    getAllDeliveredOrdersController
)

router.post(
    '/disputed',
    validateRequest(filterSchema, "body"),
    validateRequest(getAllOrdersSchema, "query"),
    authorizeAdmin,
    getAllDisputedOrdersController
)
module.exports = router
