import { updateCar } from './carsController'
import { where } from 'sequelize/types'
import bcrypt from 'bcryptjs'
import { RequestHandler } from 'express'
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index'
import DriversData from '../models/DriversData'
import nodemailer from 'nodemailer'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { googleAuth } from '../middleware/sideAuth'

let mail = nodemailer.createTransport({
  port: 587,
  service: 'gmail',
  auth: {
    user: 'cstruchevs@gmail.com',
    pass: 'semenDigital20124265000s',
  },
})

export const googleRegister: RequestHandler = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw res.status(401).json({ message: authHeader })
    // throw new UnAuthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  let result: any = {}

  try {
    result = await googleAuth(token)
  } catch (error) {
    throw res.status(401).json({ message: 'Incorrect oauth2 token' })
  }

  const { email, name } = result
  let user: any

  user = await User.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    user = await User.create({
      email,
      fullName: name,
    })
  }

  const newToken = user.createJWT()

  res.status(200).json({ user, token: newToken })
}

export const facebookRegister: RequestHandler = async (req, res) => {
  const authHeader = req.headers.authorization
  const { email, name } = req.body

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw res.status(401).json({ message: authHeader })
    // throw new UnAuthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]

  let user: any

  user = await User.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    user = await User.create({
      email,
      fullName: name,
    })
  }

  const newToken = user.createJWT()

  res.status(200).json({ user, token: newToken })
}

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

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token })
}


export const recoverPassword: RequestHandler = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequestError('Please provide email')
  }

  const user: any = await User.findOne({ where: { email: email } })

  if (!user) {
    throw new BadRequestError('Please provide correct email')
  }

  const token = user.createJWT()

  const link = `http://localhost:3000/recover-password/${user.id}/${token}`

  let mailOptions = {
    from: 'cstruchevs@gmail.com',
    to: `${email}`,
    subject: 'Link to change your password',
    text: `Сlick to the next link to change your password`,
    html: `<p>Click <a href=${link}>here</a> to reset your password</p>`,
  }

  mail.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
  res.status(StatusCodes.OK).json('Email sent')
}

export const recoverPasswordVerify: RequestHandler = async (req, res) => {
  const { id, token } = req.params
  if (!id && !token) {
    throw new BadRequestError('Please provide email')
  }
  try {
    const virify: string | JwtPayload = jwt.verify(token, 'jwtsecret')
  } catch (error) {
    // res.status(400).send(error);
    throw new UnAuthenticatedError('Authentication Invalid')
  }
  res.status(StatusCodes.OK).json("Verified")
}
