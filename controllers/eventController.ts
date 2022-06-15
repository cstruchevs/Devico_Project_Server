import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index'
import User from '../models/User'
import Event from '../models/Event'
import EventParticipants from '../models/EventParticipants'
import { Op, where } from 'sequelize/types'
import moment from 'moment'
import sequelize from '../db/database'
import Car from '../models/Car'
import { getFileStream, deleteFile, statusgetImageURL } from './s3Constroller'
import { io } from '../app'
import { addNotificationInner } from './notificationsController'

export const postEvent: RequestHandler = async (req, res) => {
  let {
    name,
    date,
    place,
    discipline,
    status,
    series,
    image,
    costOfParticipation,
    eventInfo,
    statusProgress,
  } = req.body

  if (
    !name ||
    !date ||
    !place ||
    !discipline ||
    !status ||
    !series ||
    !costOfParticipation ||
    !eventInfo
  ) {
    throw new BadRequestError('please provide all values')
  }

  if (!statusProgress) {
    statusProgress = 'none'
  }

  const event: any = await Event.create({
    name,
    date,
    place,
    discipline,
    status,
    series,
    costOfParticipation,
    eventInfo,
    statusProgress,
  })

  res.status(StatusCodes.OK).json(event)
}

export const userRegisterEvent: RequestHandler = async (req, res) => {
  const {
    id: userId,
    eventId: eventId,
    carId: carId,
    vehicleClass: vehicleClass,
    desiredPartNumber: desiredPartNumber,
  } = req.body

  if (!userId || !eventId || !vehicleClass || !carId) {
    throw new BadRequestError('please provide all values')
  }
  const event: any = await EventParticipants.create({
    userId,
    eventId,
    vehicleClass,
    carId,
    desiredPartNumber,
  })

  res.status(StatusCodes.OK).json(event)
}

export const updateEvent: RequestHandler = async (req, res) => {
  const id = req.params.id
  const { name, date, place, discipline, status, series, costOfParticipation, eventInfo } = req.body

  if (!id) {
    throw new BadRequestError('Please provide id')
  }

  let event: any = await Event.findOne({ where: { id: id } })
  if (!event) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  event.update({
    name: name,
    date: date,
    place: place,
    discipline: discipline,
    status: status,
    series: series,
    costOfParticipation: costOfParticipation,
    eventInfo: eventInfo,
  })

  res.status(StatusCodes.OK).json(event)
}

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }
  await Event.destroy({ where: { id: id } })

  res.status(StatusCodes.OK).json(`Deleted event with id ${id}`)
}

export const deleteUserEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }
  await EventParticipants.destroy({ where: { eventId: id } })

  res.status(StatusCodes.OK).json(`Deleted event with id ${id}`)
}

export const getAllEvents: RequestHandler = async (req, res) => {
  const events: any[] = await Event.findAll({ order: [['date', 'ASC']] })

  let imageUrls: any[] = []
  for (let i = 0; i < events.length; i++) {
    if (events[i].imageKey) {
      const { imageUrl } = await statusgetImageURL(events[i].imageKey)
      imageUrls.push(imageUrl)
    } else {
      imageUrls.push(null)
    }
  }

  let eventsWithUrls: any[] = []
  for (let i = 0; i < events.length; i++) {
    eventsWithUrls.push({ event: events[i], url: imageUrls[i] })
  }

  res.status(StatusCodes.OK).json(eventsWithUrls)
}

export const getYearsEvents: RequestHandler = async (req, res) => {
  const events: any[] = await Event.findAll({
    where: sequelize.where(
      sequelize.fn('YEAR', sequelize.col('date')),
      new Date().getUTCFullYear(),
    ),
    order: [['date', 'ASC']],
  })

  let imageUrls: any[] = []
  for (let i = 0; i < events.length; i++) {
    if (events[i].imageKey) {
      const { imageUrl } = await statusgetImageURL(events[i].imageKey)
      imageUrls.push(imageUrl)
    } else {
      imageUrls.push(null)
    }
  }

  let eventsWithUrls: any[] = []
  for (let i = 0; i < events.length; i++) {
    eventsWithUrls.push({ event: events[i], url: imageUrls[i] })
  }

  res.status(StatusCodes.OK).json(eventsWithUrls)
}

export const getOneEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }

  const event: any = await Event.findOne({
    where: { id: id },
    include: [
      {
        model: EventParticipants,
        attributes: ['desiredPartNumber', 'id', 'status'],
        include: [
          {
            model: Car,
            attributes: ['model'],
          },
          {
            model: User,
            attributes: ['fullName'],
          },
        ],
      },
    ],
  })

  if (event.imageKey) {
    const { imageUrl } = await statusgetImageURL(event.imageKey)
    res.status(StatusCodes.OK).json({ event: event, url: imageUrl })
  } else {
    res.status(StatusCodes.OK).json({ event: event, url: null })
  }
}

export const getEventsForOneUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }

  const events: any = await User.findOne({
    where: { id: id },
    include: [
      {
        model: EventParticipants,
        attributes: ['id'],
        include: [
          {
            model: Event,
            where: sequelize.where(
              sequelize.fn('YEAR', sequelize.col('date')),
              new Date().getUTCFullYear(),
            ),
          },
        ],
      },
    ],
  })

  let imageUrls: any[] = []
  for (let i = 0; i < events.event_participants.length; i++) {
    if (events.event_participants[i].event.imageKey) {
      const { imageUrl } = await statusgetImageURL(events.event_participants[i].event.imageKey)
      imageUrls.push(imageUrl)
    } else {
      imageUrls.push(null)
    }
  }

  let eventsWithUrls: any[] = []
  for (let i = 0; i < events.event_participants.length; i++) {
    eventsWithUrls.push({ event: events.event_participants[i].event, url: imageUrls[i] })
  }

  res.status(StatusCodes.OK).json({ events: eventsWithUrls })
}

export const getMonthEvents: RequestHandler = async (req, res) => {
  const month: number = parseInt(req.params.month)
  const year: number = parseInt(req.params.year)
  const events: any[] = await Event.findAll({
    where: [
      sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
      sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month),
    ],
    attributes: ['date', 'name'],
    order: [['date', 'ASC']],
  })

  res.status(StatusCodes.OK).json(events)
}

export const getUpcomingEvents: RequestHandler = async (req, res) => {
  const events: any[] = await Event.findAll({
    where: {
      date: {
        $gte: new Date(),
      },
    },
    order: [['date', 'ASC']],
  })

  res.status(StatusCodes.OK).json(events)
}

export const getAllEventsCalendar: RequestHandler = async (req, res) => {
  const events: any[] = await Event.findAll({
    attributes: ['date', 'name'],
    order: [['date', 'ASC']],
  })

  res.status(StatusCodes.OK).json(events)
}

export const updateParticipantStatus: RequestHandler = async (req, res) => {
  const { userId, eventId, status } = req.body

  if (!userId || !eventId || !status) {
    throw new BadRequestError('Please provide all arguments')
  }

  let participant: any = await EventParticipants.findOne({
    where: { userId: userId, eventId: eventId },
  })
  if (!participant) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  participant.update({
    status: status,
  })

  if (io.sockets.adapter.rooms.get(`user_${userId}`)) {
    io.to(`user_${userId}`).emit(
      'receive_notification',
      JSON.stringify({ text: status, updatedAt: new Date() }),
    )
  } else {
    await addNotificationInner(userId, status)
  }

  res.status(StatusCodes.OK).json(participant)
}
