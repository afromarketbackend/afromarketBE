const {Router} = require('express')
const { authorizeLogin } = require('../../common/middlewares/authorizeLogin')
const {authorize} = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { getWalletController } = require('./wallet.controller')
const {

} = require('./wallet.schema')

const router = Router()

router.get(
    '/get-wallet',
    authorize(),
    getWalletController
)


module.exports = router