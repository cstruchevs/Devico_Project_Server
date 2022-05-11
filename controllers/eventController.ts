import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index'
import User from '../models/User'
import Event from '../models/Event'
import EventParticipants from '../models/EventParticipants'
import { Op, where } from 'sequelize/types'
import moment from 'moment'
import sequelize from '../db/database'

export const postEvent: RequestHandler = async (req, res) => {
  let {
    name,
    date,
    place,
    discipline,
    status,
    series,
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
  const { id: userId, eventId: eventId, carId: carId,vehicleClass } = req.body
  if (!userId || !eventId || !vehicleClass || !carId) {
    throw new BadRequestError('please provide all values')
  }
  await EventParticipants.create({ userId, eventId, vehicleClass, carId })

  res
    .status(StatusCodes.OK)
    .json(`User with id ${userId} registered to the event with id ${eventId}`)
}

export const updateEvent: RequestHandler = async (req, res) => {
  const { id, name, date, place, discipline, status, series, costOfParticipation, eventInfo } =
    req.body

  if (!id) {
    throw new BadRequestError('Please provide id')
  }

  let event: any = await User.findOne({ where: { id: id } })
  if (!event) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  event = await Event.upsert({
    id: id,
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
  const events = await Event.findAll()
  res.status(StatusCodes.OK).json(events)
}

export const getOneEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }
  const event: any = await Event.findOne({
    where: { id: id },
  })
  if (!event) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  res.status(StatusCodes.OK).json(event)
}

export const getEventsForOneUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }

  const events = await User.findOne({
    where: { id: id },
    include: {
      model: Event,
      through: {
        attributes: [],
      },
    },
  })
  res.status(StatusCodes.OK).json(events)
}

export const getUsersForOneEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }

  const users = await Event.findOne({
    where: { id: id },
    include: {
      model: User,
      through: {
        attributes: [],
      },
    },
  })
  res.status(StatusCodes.OK).json(users)
}

export const getEventsForYear: RequestHandler = async (req, res) => {
  const startDate = moment('01/01/2022', 'DD/MM/YYYY')
  const endDate = moment('01/01/2023', 'DD/MM/YYYY')
  const events = await Event.findAll({
    where: {
      createdAt: {
        $lt: new Date()
      }
    }
  })
  res.status(StatusCodes.OK).json(events)
}

export const getEventsForLastYears: RequestHandler = async (req, res) => {
  const events = await Event.findAll({ where: {} })
  res.status(StatusCodes.OK).json(events)
}
