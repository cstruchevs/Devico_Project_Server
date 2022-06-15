import { updateCar } from './carsController'
import { where } from 'sequelize/types'
import bcrypt from 'bcryptjs'
import { RequestHandler } from 'express'
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index'
import DriversData from '../models/DriversData'
import { deleteFile, getUploadImageUrl, statusgetImageURL } from './s3Constroller'

export const getUserInfo: RequestHandler = async (req, res) => {
  const id = req.params.id
  const user: any = await User.findOne({ where: { id: id } })
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  
  if (user.avatarKey) {
    const { imageUrl } = await statusgetImageURL(user.avatarKey)
    res.status(StatusCodes.OK).json({ data: user, image: imageUrl })
  } else {
    res.status(StatusCodes.OK).json({ data: user, image: null })
  }
}

export const getAllUsers: RequestHandler = async (req, res) => {
  const page:number = Number(req.params.page)
  const limit:number = Number(req.params.limit)
  const offset = page * 10
  const users: any = await User.findAll({ include: ['driversdata'], offset, limit })
  const count = await User.count()
  if (!users) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  res.status(StatusCodes.OK).json({ data: {users, count} })
}

export const updateUserAvatar: RequestHandler = async (req, res) => {
  const id = req.body.id
  const key = req.body.key

  const user: any = await User.findOne({ where: { id: id } })
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  if (user.avatarKey) {
    await deleteFile(user.avatarKey)
  }

  const { imageUrl } = await statusgetImageURL(key)

  user.update({ avatarKey: key })
  res.json({ user, imageUrl })
}

export const updateUser: RequestHandler = async (req, res) => {
  const { email, fullName, phone, password, id } = req.body

  const user: any = await User.findOne({ where: { id: id } })
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  let hash
  if (password) {
    const salt = await bcrypt.genSalt(10)
    hash = await bcrypt.hash(password, salt)
  }

  user.update(
    { email: email, fullName: fullName, password: hash, phone: phone },
    { where: { id: id } },
  )

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token })
}

export const deleteUser: RequestHandler = async (req, res) => {
  const  email  = req.params.email
  if (!email) {
    throw new BadRequestError('Please provide email')
  }
  await User.destroy({ where: { email } })

  res.status(StatusCodes.OK).json(`Deleted user with email ${email}`)
}

export const updateDriversData: RequestHandler = async (req, res) => {
  const {
    city,
    dob,
    regAdress,
    driverLicense,
    representiveFullName,
    representiveLicense,
    idNumber,
    sportDriverLicense,
    nickname,
    phone,
    id,
  } = req.body

  if (!id) {
    throw new BadRequestError('Please provide all values')
  }

  const user: any = await User.findOne({ where: {} })

  const driversData: any = await DriversData.findOne({ where: { user_id: id } })
  if (!driversData) {
    await DriversData.create({
      city: city,
      dob: dob,
      regAdress: regAdress,
      driverLicense: driverLicense,
      representiveFullName: representiveFullName,
      representiveLicense: representiveLicense,
      idNumber: idNumber,
      sportDriverLicense: sportDriverLicense,
      nickname: nickname,
      phone: phone,
      user_id: id,
    })
  }

  driversData.update(
    {
      city: city,
      dob: dob,
      regAdress: regAdress,
      driverLicense: driverLicense,
      representiveFullName: representiveFullName,
      representiveLicense: representiveLicense,
      idNumber: idNumber,
      sportDriverLicense: sportDriverLicense,
      nickname: nickname,
      phone: phone,
    },
    { where: { id: id } },
  )
  res.status(StatusCodes.OK).json(driversData)
}

export const getUsersDriversData: RequestHandler = async (req, res) => {
  const { id } = req.params

  if (!id) {
    throw new BadRequestError('Please provide all values')
  }

  const user: any = await User.findOne({
    where: { id: id },
    include: ['driversdata'],
  })

  if (!user) {
    throw new BadRequestError('Please correct id')
  }
  const driversData: any = await DriversData.findOne({ where: { user_id: id } })

  res.status(StatusCodes.OK).json(driversData)
}
