const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
    myWithdrawalsController,
    viewOneWithDrawalController,
    makewithdrawalController
} = require('./withdrawal.controller')
const {
    singleModelSchema
} = require('./withdrawal.schema')

const router = Router()


router.get(
    '/my-wd',
    authorize(),
    myWithdrawalsController
) 

router.get(
    '/view/:id',
    authorize(),
    validateRequest(singleModelSchema, 'params'),
    viewOneWithDrawalController
) 

router.get(
    '/initiate',
    authorize(),
   makewithdrawalController 
) 



module.exports = router