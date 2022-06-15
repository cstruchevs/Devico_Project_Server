import express from 'express'
import { getNotifications } from '../controllers/notificationsController'

const router = express.Router()

router.route('/:userId').get(getNotifications)

export default router