import { where } from 'sequelize/types'
import bcrypt from 'bcryptjs'
import { RequestHandler } from 'express'
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index'
import { uploadFile, getFileStream } from './s3Constroller'

export const getUserInfo: RequestHandler = async (req, res) => {

  const user: any = await User.findOne({ where: { id: 1 } })
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  res.status(StatusCodes.OK).json({ data: user })

//   if (user.avatar) {
//     const key = user.avatar
//     const readStream = getFileStream(key)

//     res.status(StatusCodes.OK).json({ data: user, image: readStream.pipe(res) })
//   } else {
//     res.status(StatusCodes.OK).json({ data: user })
//   }

  //   if (req.file) {
  //     const file = req.file
  //     const uploadedImage = await uploadFile(file?.path, file?.filename)
  //     user.update({ avatar: uploadedImage.Key }, { where: { id: id } })
  //   }

  //   const token = user.createJWT()

  //   readStream.pipe(res)
}
