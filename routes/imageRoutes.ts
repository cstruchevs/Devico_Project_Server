import express from 'express'
import auth from "../middleware/auth"
const router = express.Router()

import { getImageUrl, getUploadImageUrl, getImage } from '../controllers/s3Constroller';


router.route('/uploadUrl/:folder').get(getUploadImageUrl)
router.route('/iamgeUrl/:key').get(getImageUrl)
router.route('/images/:folder/:key').get(getImage)

export default router