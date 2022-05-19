import express from 'express'
import { getImageUrl, getUploadImageUrl } from '../controllers/s3Constroller';
const router = express.Router()


import { getUserInfo } from './../controllers/userController';


router.route('/user').get(getUserInfo)
router.route('/uploadUrl/:folder').get(getUploadImageUrl)
router.route('/iamgeUrl/:folder/:key').get(getImageUrl)

export default router