const Router = require('express').Router
const authRouter = new Router()
const userController = require('../controllers/user-controller')
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')

authRouter.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration)
authRouter.post('/login', userController.login)
authRouter.post('/logout', userController.logout)
authRouter.get('/activate/:link', userController.activate)
authRouter.get('/refresh', userController.refresh)
authRouter.get('/me', userController.me)
authRouter.get('/users', authMiddleware, userController.getUsers)

module.exports = authRouter