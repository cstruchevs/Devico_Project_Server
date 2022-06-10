import express from 'express'
import auth from "../middleware/auth"
const router = express.Router()

import { getUserInfo, updateUser,  updateDriversData, getUsersDriversData, updateUserAvatar, getAllUsers, deleteUser} from './../controllers/userController';

router.route('/:id').get(getUserInfo)
router.route('/all/:page/:limit').get(getAllUsers)
router.route('/:email').delete(deleteUser)
router.route('/').patch(updateUser)
router.route('/driversData').post(updateDriversData)
router.route('/driversData/:id').get(getUsersDriversData)
router.route("/avatar").patch(updateUserAvatar)

export default router