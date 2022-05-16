import { updateCar } from './carsController'
import { where } from 'sequelize/types'
import bcrypt from 'bcryptjs'
import { RequestHandler } from 'express'
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index'
import DriversData from '../models/DriversData'
import { uploadFile, getFileStream, deleteFile } from './s3Constroller'

export const register: RequestHandler = async (req, res) => {
  const { email, password, phone, fullName } = req.body

  if (!email || !password) {
    throw new BadRequestError('please provide all values')
  }
  const userAlreadyExists = await User.findOne({ where: { email: email } })
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }

  const user: any = await User.create({
    email,
    password,
    phone,
    fullName,
  })

  const userDriversData: any = await User.findOne({ where: { email: email }, attributes: ['id'] })
  const driversData: any = await DriversData.create({ user_id: userDriversData.id })

  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user,
    token,
  })
}

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user: any = await User.findOne({ where: { email: email } })
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token })
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

  if (req.file) {
    const file = req.file
    if(user.avatar) {
      const deleteAvatar = await deleteFile(user.avatar)
    }
    const uploadedImage = await uploadFile(file?.path, file?.filename, "avatars")
    user.update({ avatar: uploadedImage.Key}, { where: { id: id } })
  }

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token })
}

export const deleteUser: RequestHandler = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequestError('Please provide email')
  }
  await User.destroy({ where: { email: email } })

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

  const driversData: any = await DriversData.findOne({ where: { user_id: id } })
  if (!driversData) {
    throw new UnAuthenticatedError('Invalid Credentials')
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

export const getImage: RequestHandler = async (req, res) => {
  const key = req.params.key
  const folder = req.params.folder
  const readStream = getFileStream(folder, key)

  readStream.pipe(res)
}

export const getUsersDriversData: RequestHandler = async (req, res) => {
  const { id } = req.params

  if (!id) {
    throw new BadRequestError('Please provide all values')
  }

  const user: any = await User.findOne({
    where: { id: id },
  })

  if (!user) {
    throw new BadRequestError('Please correct id')
  }

  const driversData: any = await DriversData.findOne({ where: { user_id: id } })

  res.status(StatusCodes.OK).json(driversData)
}
