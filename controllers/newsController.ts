import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { BadRequestError } from '../errors'
import News from '../models/News'
import { getFileStream, deleteFile, statusgetImageURL } from './s3Constroller'

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

  let imageUrls = []
  for(let i = 0; i < news.length; i++) {
    if(news[i].imageKey) {
      const {imageUrl} = await statusgetImageURL(news[i].imageKey)
      imageUrls.push(imageUrl)
    } else {
      imageUrls.push(null)
    }
  }

  let newsWithUrls = []
  for(let i = 0; i < news.length; i++) {
    newsWithUrls.push({news: news[i], url: imageUrls[i]})
  }

  res.status(StatusCodes.OK).json(newsWithUrls)

}
