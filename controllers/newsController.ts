import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { BadRequestError } from '../errors'
import News from '../models/News'
import { getFileStream, deleteFile } from './s3Constroller'

export const postNews: RequestHandler = async (req, res) => {
  const { title, date, description } = req.body

  if (!title || !date || !description) {
    throw new BadRequestError('please provide all values')
  }

  // let uploadedImage = null
  // if (req.file) {
  //   const file = req.file
  //   uploadedImage = await uploadFile(file?.path, file?.filename, 'events')
  // }

  const news: any = await News.create({
    title,
    date,
    description,
  })

  // if (req.file) {
  //   const file = req.file
  //   const uploadedImage = await uploadFile(file?.path, file?.filename, 'news')
  //   news.update({
  //     image: uploadedImage.Key,
  //   })
  // }

  res.status(StatusCodes.OK).json(news)
}

export const updateNews: RequestHandler = async (req, res) => {
  const id = req.params.id
  const { title, date, description } = req.body

  const news: any = await News.findOne({ where: { id: id } })
  if (!news) {
    throw new BadRequestError('Please provide correct id')
  }

  news.update({
    title,
    date,
    description,
  })

  // if (req.file) {
  //   const file = req.file
  //   if (news.image) {
  //     const deleteAvatar = await deleteFile(news.image)
  //   }
  //   const uploadedImage = await uploadFile(file?.path, file?.filename, 'news')
  //   news.update({
  //     image: uploadedImage.Key,
  //   })
  // }

  res.status(StatusCodes.OK).json(news)
}

export const deleteNews: RequestHandler = async (req, res) => {
  const { id } = req.body

  if (!id) {
    throw new BadRequestError('please provide id')
  }

  const news: any = await News.destroy({
    where: { id: id },
  })
  res.status(StatusCodes.OK).json(news)
}

export const getNews: RequestHandler = async (req, res) => {
  const news: any = await News.findAll({ order: [['date', 'DESC']] })
  res.status(StatusCodes.OK).json(news)
}
