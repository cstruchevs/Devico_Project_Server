import express from 'express'
const router = express.Router()

import { deleteCar, getAllCars, updateCar, postCar } from '../controllers/carsController'
import auth from '../middleware/auth'

router.route('/post').post(auth, postCar)
router.route('/:id').get(getAllCars).patch(updateCar)
router.route('/:id/:token').delete(deleteCar)

export default router