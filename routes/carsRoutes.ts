import express from 'express'
const router = express.Router()

import { deleteCar, getAllCars, updateCar, postCar } from '../controllers/carsController'

router.route('post').post(postCar)
router.route('update').patch(updateCar)
router.route('/:id').delete(deleteCar).get(getAllCars)


export default router