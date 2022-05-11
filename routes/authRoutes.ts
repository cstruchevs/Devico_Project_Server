import express from 'express'
const router = express.Router()

import { getUsersDriversData, login, register, updateDriversData, updateUser } from '../controllers/authConroller'

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/update').patch(updateUser)
router.route('/driversData').post(updateDriversData)
router.route('/driversData/:id').get(getUsersDriversData)


export default router
