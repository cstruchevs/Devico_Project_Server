import express from 'express'
const router = express.Router()

import { postEvent, userRegisterEvent, deleteEvent, updateEvent, getAllEvents, getOneEvent, getEventsForOneUser, getEventsForYear, getUsersForOneEvent, getYearsEvents} from '../controllers/eventController'
import auth from '../middleware/auth'

router.route('/').post(postEvent)
router.route('/').get(getAllEvents)
router.route('/yearsEvents').get(getYearsEvents)
router.route('/:id').get(getOneEvent)
router.route('/:id').delete(deleteEvent)
router.route('/:id').patch(updateEvent)
router.route('/reg').post(userRegisterEvent)
router.route('/usersEvents/:id').get(getEventsForOneUser)
router.route('/eventsUser/:id').get(getUsersForOneEvent)

export default router