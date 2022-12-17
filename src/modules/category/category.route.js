const {Router} = require('express')
const { authorize, authorizeMerchant, authorizeAdmin } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
    getAllCategoriesController,
    addNewCategoryController,
    getACategoryController,
    getAllProductsInACategoryController,
    searchCategoryController
} = require('./category.controller')
const {
    addCategorySchema,
    getAllCategoriesSchema,
    singleProductSchema,
    searchCategorySchema
} = require('./category.schema')

const router = Router()

router.post(
    '/new',
    authorizeAdmin,
    validateRequest(addCategorySchema, "body"),
    addNewCategoryController

)

router.get(
    '/view/:id',
    // authorizeAdmin,
     validateRequest(singleProductSchema, "params"),
    getACategoryController

)

router.get(
    '/all',
    validateRequest(getAllCategoriesSchema, "query"),
    getAllCategoriesController

)
router.get(
    '/categorised_products/:id',
    validateRequest(singleProductSchema, "params"),
    getAllProductsInACategoryController

)
router.post(
    '/find',
    validateRequest(searchCategorySchema, "body"),
    validateRequest(getAllCategoriesSchema, "query"),
    searchCategoryController

)

module.exports = router