import express from 'express'
const router = express.Router()

import { postEvent, userRegisterEvent, deleteEvent, updateEvent, getAllEvents, getOneEvent, getEventForOneUser} from '../controllers/eventController'

router.route('/post').post(postEvent)
router.route('/registerToEvent').post(userRegisterEvent)
router.route('/delete/:id').delete(deleteEvent)
router.route('/update').patch(updateEvent)
router.route('/allEvents').get(getAllEvents)
router.route('/oneEvent/:id').get(getOneEvent)
router.route('/usersEvents/:id').get(getEventForOneUser)

export default router