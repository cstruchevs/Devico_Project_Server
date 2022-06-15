import express from 'express'
const router = express.Router()

import {
  postEvent,
  userRegisterEvent,
  deleteEvent,
  updateEvent,
  getAllEvents,
  getOneEvent,
  getEventsForOneUser,
  getYearsEvents,
  getAllEventsCalendar,
  getMonthEvents,
  getUpcomingEvents,
  updateParticipantStatus,
} from '../controllers/eventController'
import auth from '../middleware/auth'

router.route('/').post(postEvent)
router.route('/').get(getAllEvents)

router.route("/changeStatus").patch(updateParticipantStatus)

router.route('/testOne/:id').get(getOneEvent)
router.route('/upcoming').get(getUpcomingEvents)
router.route('/yearsEvents').get(getYearsEvents)
router.route('/calendar').get(getAllEventsCalendar)
router.route('/monthEvents/:month/:year').get(getMonthEvents)
router.route('/:id').get(getOneEvent)
router.route('/:id').delete(deleteEvent)
router.route('/:id').patch(updateEvent)
router.route('/reg').post(userRegisterEvent)
router.route('/usersEvents/:id').get(getEventsForOneUser)

export default router
