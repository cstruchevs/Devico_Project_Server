import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { BadRequestError } from '../errors'
import News from '../models/News'

export const postNews: RequestHandler = async (req, res) => {
  const { title, date, description } = req.body

  if (!title || !date || !description) {
    throw new BadRequestError('please provide all values')
  }

  const news: any = await News.create({
    title,
    date,
    description,
  })
  res.status(StatusCodes.OK).json(news)
}

export const updateNews: RequestHandler = async (req, res) => {
  const { id, title, date, description } = req.body

  if (!title || !date || !description || !id) {
    throw new BadRequestError('please provide all values')
  }

  const newsFound: any = await News.findOne({ where: { id: id } })
  if (!newsFound) {
    throw new BadRequestError('Please provide correct id')
  }

  const news: any = await News.upsert({
    id,
    title,
    date,
    description,
  })
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
  const news: any = await News.findAll({order: [
    ['date', 'DESC'],
],})
  res.status(StatusCodes.OK).json(news)
}
