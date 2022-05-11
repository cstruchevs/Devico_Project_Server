import { deleteNews, getNews, postNews, updateNews } from './../controllers/newsController';
import express from 'express'
const router = express.Router()

import {} from '../controllers/eventController'

router.route('/').post(postNews)
router.route('/').get(getNews)
router.route('/').patch(updateNews)
router.route('/').delete(deleteNews)

export default router