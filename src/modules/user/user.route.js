const {Router} = require('express')
const { authorizeLogin } = require('../../common/middlewares/authorizeLogin')
const {authorize} = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
 registerUserController,
 loginUserController,
 logoutUserController,
 forgotPasswordController,
 resetPasswordController,
 viewUserProfileController,
 updateUserProfileController,
 changePasswordController
} = require('./user.controller')
const {
 registerUserSchema,
 loginUserSchema,
 forgotPasswordSchema,
 resetPasswordSchema,
 changePasswordSchema
} = require('./user.schema')

const router = Router()

router.post(
    '/signup',
    validateRequest(registerUserSchema, "body"),
    registerUserController
)
router.post(
    '/login',
    validateRequest(loginUserSchema, "body"),
    authorizeLogin,
    loginUserController
)

router.get(
    '/view-profile',
    authorize(),
    viewUserProfileController
)

router.patch(
    '/update-profile',
    authorize(),
    upload.single("avatar"),
    updateUserProfileController
)


router.get(
    '/logout',
    authorize(),
    logoutUserController
)

//PASSWORDS

router.patch(
    '/pass/change',
    authorize(),
    validateRequest(changePasswordSchema, "body"),
    changePasswordController
)

router.post(
    '/pass/forgot',
    validateRequest(forgotPasswordSchema, "body"),
    forgotPasswordController
)

router.post(
    '/pass/reset',
    validateRequest(resetPasswordSchema, "body"),
    resetPasswordController
)

module.exports = router