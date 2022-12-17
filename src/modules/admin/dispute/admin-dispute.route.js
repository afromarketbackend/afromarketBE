const {Router} = require('express')
const {authorizeAdmin } = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const {
    getAllDisputesController,
    getOneDisputeController,
    awardDisputeController
} = require('./admin-dispute.controller')
const {
    getAlldisputesSchema, 
    singleDisputeSchema,
    awardDisputeSchema
} = require('./admin-dispute.schema')

const router = Router()

router.get(
    '/all',
    validateRequest(getAlldisputesSchema, 'query'),   
    authorizeAdmin,
    getAllDisputesController
)

router.get(
    '/one/:id',
    validateRequest(singleDisputeSchema, 'params'),   
    authorizeAdmin,
    getOneDisputeController
)

router.post(
    '/award/:id',
    validateRequest(singleDisputeSchema, 'params'), 
    validateRequest(awardDisputeSchema, 'query'),  
    authorizeAdmin,
    awardDisputeController
)

module.exports = router
