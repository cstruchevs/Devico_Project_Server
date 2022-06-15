import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { BadRequestError } from '../errors'
import Notifications from '../models/Notifications'
import { io } from '../app'

export const addNotificationInner = async (userId: string, text: string) => {
  const not: any = await Notifications.create({
    userId,
    text,
  })

  return JSON.stringify(not)
}

export const deleteNotificationsForUserInner = async (userId: string) => {
  const nots: any = await Notifications.destroy({
    where: { userId: userId },
  })
  return JSON.stringify(nots)
}

export const getNotificationInner = async (userId: string) => {
  const nots: any = await Notifications.findAll({ where: { userId: userId } })
  const del: any = await deleteNotificationsForUserInner(userId)

  io.to(`user_${userId}`).emit('receive_message', JSON.stringify(nots))
}

export const getNotifications: RequestHandler = async (req, res) => {
  const userId = req.params.userId
  const nots: any = await Notifications.findAll({ where: { userId: userId } })
  if (userId) {
    await deleteNotificationsForUserInner(userId)
  }

  res.status(StatusCodes.OK).json(nots)
}

export const deleteNotificationsForUser: RequestHandler = async (req, res) => {
  const userId = req.params.userId
  const nots: any = await Notifications.destroy({
    where: { userId: userId },
  })
  return JSON.stringify(nots)
}
