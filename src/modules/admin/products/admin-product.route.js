const {Router} = require('express')
const { authorize, authorizeMerchant, authorizeAdmin } = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const { 
    getAllProductsController,
    getAProductByAdminController,
    flagAProductByAdminController
} = require('./admin-product.controller')
const {
 getAllProductSchema,
 singleProductSchema
} = require('./admin-product.schema')

const router = Router()

// router.post(
//     '/upload',
//     validateRequest(uploadProductSchema, "body"),
//     authorize(),
//     uploadProductController
// )
// router.patch(
//     '/:id/upload-image',
//     validateRequest(uploadProductImageSchema, "params"),
//     authorizeMerchant(),
//     upload.single("image"),
//     uploadProductImagesController
// )

// router.get(
//     '/get-one/:id',
//     validateRequest(singleProductSchema, "params"),
//     getSingleProductyByAUserController
// ) 

// router.get(
//     '/owned/:id',
//     validateRequest(singleProductSchema, "params"),
//     getSingleProductyByAMerchantController
// ) 

router.get(
    '/get-all',
    validateRequest(getAllProductSchema, "query"),
    authorizeAdmin,
    getAllProductsController
) 

router.get(
    '/one/:id',
    validateRequest(singleProductSchema, "params"),
    authorizeAdmin,
    getAProductByAdminController
)
router.patch(
    '/one/:id',
    validateRequest(singleProductSchema, "params"),
    authorizeAdmin,
    flagAProductByAdminController
)

module.exports = router