import express from 'express'

const router = express.Router()

import rateLimiter from 'express-rate-limit'
import auth from '../middleware/auth'

import { login, recoverPassword, recoverPasswordVerify, register, googleRegister, facebookRegister, adminLogin,} from '../controllers/authConroller'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

router.route('/admin-login').post(adminLogin)
router.route('/recover-password').post(recoverPassword)
router.route('/recover-password-verify/:id/:token').post(recoverPasswordVerify)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/google-register').get(googleRegister)
router.route('/facebook-register').post(facebookRegister)

export default router
