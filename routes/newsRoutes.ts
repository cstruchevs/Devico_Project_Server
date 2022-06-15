import { deleteNews, getNews, postNews, updateNews } from './../controllers/newsController';
import express from 'express'

const router = express.Router()

router.route('/').post(postNews)
router.route('/').get(getNews)
router.route('/:id').patch(updateNews)
router.route('/:id').delete(deleteNews)

export default router