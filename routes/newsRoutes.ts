import { deleteNews, getNews, postNews, updateNews } from './../controllers/newsController';
import express from 'express'
import multer from 'multer'

const upload = multer({ dest: 'imgs/news' })

const router = express.Router()

import {} from '../controllers/eventController'

router.route('/').post(upload.single('image'), postNews)
router.route('/').get(getNews)
router.route('/:id').patch(upload.single('image'), updateNews)
router.route('/:id').delete(deleteNews)

export default router