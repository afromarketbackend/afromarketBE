const {Router} = require('express')
const {authorizeAdmin } = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const adminHomeController = require('./admin-home.controller')
const { adminHomeSchema } = require('./admin-home.schema')
const router = Router()

router.get(
    '/home',
    authorizeAdmin,
    validateRequest(adminHomeSchema, "query"),
    adminHomeController.home

)

module.exports = router
