const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
    uploadProductController,
    removeProductController,
    getSingleProductyByAUserController,
    getAllProductsController,
    getMyProductsByMerchantController,
    getSingleProductyByAMerchantController,
    getAllProductsByMerchantController,
    editAllProductController,
    updateProductController
} = require('./product.controller')
const {
 singleProductSchema,
 getAllProductSchema
} = require('./product.schema')

const router = Router()

router.post(
    '/upload',
    upload.array("image"),
    authorizeMerchant(),
    uploadProductController
)

router.get(
    '/get-one/:id',
    validateRequest(singleProductSchema, "params"),
    getSingleProductyByAUserController
) 

router.get(
    '/owned/:id',
    validateRequest(singleProductSchema, "params"),
    getSingleProductyByAMerchantController
) 

router.get(
    '/get-all',
    validateRequest(getAllProductSchema, "query"),
    getAllProductsController
) 

router.get(
    '/my-all',
    authorizeMerchant(),
    validateRequest(getAllProductSchema, "query"),
    getMyProductsByMerchantController
) 


router.get(
    '/by-merchant/:id',
    validateRequest(getAllProductSchema, "query"),
    validateRequest(singleProductSchema, "params"),
    getAllProductsByMerchantController
) 
router.post(
    '/remove/:id',
    validateRequest(singleProductSchema, "params"),
    authorizeMerchant(),
    removeProductController
)


router.post(
    '/edit-all',
    editAllProductController
)

router.patch(
    '/update/:id',
    validateRequest(singleProductSchema, "params"),
    upload.array("image"),
    authorizeMerchant(),
    updateProductController
)


module.exports = router