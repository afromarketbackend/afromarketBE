const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
    getMyNotificationsController,
    viewANotificationController
} = require('./notification.controller')
const {
 createOrderSchema,
 cancelOrderSchema,
 singleNotificationSchema,
 trackOrderSchema,
 paginateSchema
} = require('./notification.schema')

const router = Router()

router.get(
    '/all',
    validateRequest(paginateSchema, "query"),
    authorize(),
    getMyNotificationsController
)

router.get(
    '/view/:id',
    validateRequest(singleNotificationSchema, "params"),
    authorize(),
    viewANotificationController
)

module.exports = router