import express from 'express'
const router = express.Router()
import multer from 'multer'

const upload = multer({ dest: 'imgs/events' })

import { postEvent, userRegisterEvent, deleteEvent, updateEvent, getAllEvents, getOneEvent, getEventsForOneUser, getEventsForYear, getUsersForOneEvent} from '../controllers/eventController'

router.route('/').post(upload.single('image'), postEvent)
router.route('/').get(getAllEvents)
router.route('/:id').get(getOneEvent)
router.route('/:id').delete(deleteEvent)
router.route('/:id').patch(upload.single('image'), updateEvent)
router.route('/reg').post(userRegisterEvent)
router.route('/usersEvents/:id').get(getEventsForOneUser)
router.route('/eventsUser/:id').get(getUsersForOneEvent)
router.route('/yearEvents').get(getEventsForYear)

export default router