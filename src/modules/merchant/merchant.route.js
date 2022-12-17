const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const { authMerchLogin } = require('../../common/middlewares/authorizeLogin')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
registerMerchantController,
loginMerchantController,
getAllMerchantsController,
viewAMerchantController
} = require('./merchant.controller')
const {
 registerMerchantSchema,
 loginMerchantSchema,
 paginateSchema,
 modelIdSchema,
} = require('./merchant.schema')

const router = Router()

router.post(
    '/signup',
    // validateRequest(registerMerchantSchema, "body"),
    // upload.array("doc"),
    upload.any(),
    registerMerchantController
)

router.post(
    '/login',
    validateRequest(loginMerchantSchema, "body"),
    authMerchLogin,
    loginMerchantController
)

router.get(
    '/all',
    validateRequest(paginateSchema, 'query'),
    getAllMerchantsController
)

router.get(
    '/view/:id',
    validateRequest(modelIdSchema, 'params'),
    viewAMerchantController
)

module.exports = router