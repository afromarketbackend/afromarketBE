const {Router} = require('express')
const {authorizeAdmin } = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const {
    getAllUsersController,
    searchUserController,
    getAUserController,
    getNewUsersController,
    flagAUserController
} = require('./user.controller')
const {
 getAllUsersSchema,
 searchSchema,
 singleUserSchema,
 filterSchema
} = require('./user.schema')

const router = Router()

router.get(
    '/all',
    validateRequest( getAllUsersSchema, "query"),
    authorizeAdmin,
    getAllUsersController,
)

router.post(
    '/search',
    validateRequest(searchSchema, 'body'),
    authorizeAdmin,
    searchUserController
)

router.get(
    '/one/:id',
    validateRequest(singleUserSchema, 'params'),
    authorizeAdmin,
    getAUserController
)

router.post(
    '/new',
    validateRequest(filterSchema, "body"),
    validateRequest(getAllUsersSchema, "query"),
    authorizeAdmin,
    getNewUsersController
)

router.patch(
    '/one/:id',
    validateRequest(singleUserSchema, 'params'),
    authorizeAdmin,
    flagAUserController
)

module.exports = router
