import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { BadRequestError, UnAuthenticatedError } from '../errors'
import License from '../models/License'
import LicenseType from '../models/LicenseType'
import LicenseMembers from '../models/LicenseMembers'

export const postLicense: RequestHandler = async (req, res) => {
  let {
    fullNameUkranian,
    fullNameLatin,
    dob,
    nativeCity,
    address,
    email,
    phone,
    identificationNum,
    license,
    status,
  } = req.body

  if (
    !fullNameUkranian ||
    !fullNameLatin ||
    !dob ||
    !nativeCity ||
    !address ||
    !identificationNum ||
    !email ||
    !phone ||
    !license
  ) {
    throw new BadRequestError('please provide all values')
  }

  const licenseType: any = await LicenseType.findOne({ where: { name: license } })
  if (!licenseType) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  if (!status) {
    status = 'no Paid'
  }

  const licenseNew: any = await licenseType.createLicense({
    fullNameUkranian,
    fullNameLatin,
    dob,
    identificationNum,
    nativeCity,
    address,
    email,
    phone,
    status,
  })

  res.status(StatusCodes.OK).json(licenseNew)
}

export const postLicenseType: RequestHandler = async (req, res) => {
  const { name, cost, description } = req.body

  if (!name || !cost || !description) {
    throw new BadRequestError('please provide all values')
  }

  const licenseType: any = await LicenseType.create({
    name,
    cost,
    description,
  })
  res.status(StatusCodes.OK).json(licenseType)
}

export const getLicenseTypes: RequestHandler = async (req, res) => {
  const licenseTypes: any = await LicenseType.findAll()
  res.status(StatusCodes.OK).json(licenseTypes)
}

export const userRegisterLicense: RequestHandler = async (req, res) => {
  const { id: userId, licenseId: licenseId } = req.body
  if (!userId || !licenseId) {
    throw new BadRequestError('please provide all values')
  }
  await LicenseMembers.create({ userId, licenseId })

  res
    .status(StatusCodes.OK)
    .json(`User with id ${userId} registered to the license with id ${licenseId}`)
}

export const getLicenses: RequestHandler = async (req, res) => {
  const licenses = await LicenseType.findAll({
    include: ['licenses'],
  })
  res.status(StatusCodes.OK).json(licenses)
}

export const deleteLicense: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }
  const licenses = await License.destroy({ where: { id: id } })
  res.status(StatusCodes.OK).json(licenses)
}

export const deleteLicenseType: RequestHandler = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new BadRequestError('Please provide id')
  }
  const licenses = await LicenseType.destroy({ where: { id: id } })
  res.status(StatusCodes.OK).json(licenses)
}
