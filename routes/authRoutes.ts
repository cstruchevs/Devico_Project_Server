import express from 'express'

const router = express.Router()

import { login, recoverPassword, recoverPasswordVerify, register} from '../controllers/authConroller'

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

router.route('/recover-password').post(recoverPassword)
router.route('/recover-password-verify/:id/:token').post(recoverPasswordVerify)
router.route('/register').post(register)
router.route('/login').post(login)


export default router
