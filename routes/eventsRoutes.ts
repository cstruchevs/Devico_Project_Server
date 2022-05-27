import express from 'express'
const router = express.Router()

import { postEvent, userRegisterEvent, deleteEvent, updateEvent, getAllEvents, getOneEvent, getEventsForOneUser, getEventsForYear, getUsersForOneEvent} from '../controllers/eventController'
import auth from '../middleware/auth'

router.route('/post').post(postEvent)
router.route('/registerToEvent').post(auth, userRegisterEvent)
router.route('/delete/:id').delete(deleteEvent)
router.route('/update').patch(updateEvent)
router.route('/allEvents').get(getAllEvents)
router.route('/oneEvent/:id').get(getOneEvent)
router.route('/usersEvents/:id').get(getEventsForOneUser)
router.route('/eventsUser/:id').get(getUsersForOneEvent)
router.route('/yearEvents').get(getEventsForYear)

export default router