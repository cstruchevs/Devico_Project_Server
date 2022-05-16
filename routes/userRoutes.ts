import express from 'express'
const router = express.Router()


import { getUserInfo } from './../controllers/userController';


router.route('/user').get(getUserInfo)


export default router