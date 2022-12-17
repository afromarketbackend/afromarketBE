const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
createReviewController,
productReviewsController,
deleteReviewsController,
merchantReviewsController
} = require('./review.controller')
const {
    singleItemSchema,
    createReviewSchema,
    getProductReviewSchema
} = require('./review.schema')

const router = Router()

router.post(
    '/create/:id',
    validateRequest(createReviewSchema, "body"),
    validateRequest(singleItemSchema, "params"),
    authorize(),
    createReviewController
)

router.get(
    '/product/:id',
    validateRequest(getProductReviewSchema, "query"),
    validateRequest(singleItemSchema, "params"),
    authorize(),
    productReviewsController
)

router.get(
    '/merchant/:id',
    validateRequest(getProductReviewSchema, "query"),
    validateRequest(singleItemSchema, "params"),
    authorize(),
    merchantReviewsController
)

router.patch(
    '/delete/:id',
    validateRequest(singleItemSchema, "params"),
    authorize(),
    deleteReviewsController
)


module.exports = router