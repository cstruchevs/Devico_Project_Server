import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import { RequestHandler } from 'express'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import axios from "axios"
dotenv.config()

const bucketName: string = process.env['AWS_BUCKET_NAME'] as string
const region: string = process.env['AWS_BUCKET_REGION'] as string
const accessKeyId: string = process.env['AWS_ACCESS_KEY'] as string
const secretAccessKey: string = process.env['AWS_SECRET_KEY'] as string
const URL_EXPIRATION_SECONDS = 400

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
})

export const getImageUrl: RequestHandler = async (req, res) => {
  const folder = req.params.folder
  const key = req.params.key
  res.json(await statusgetImageURL(`${folder}/${key}`))
}

export const getUploadImageUrl: RequestHandler = async (req, res) => {
  const folder = req.params.folder
  const Key = `${folder}/${uuidv4()}`

  const s3Params = {
    Bucket: bucketName,
    Key: Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/*',
  }
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

  res.json({
    uploadURL: uploadURL,
    Key: Key,
  })
}

export const statusgetImageURL = async (key: string) => {
  const s3Params = {
    Bucket: bucketName,
    Key: key,
  }
  const imageUrl = await s3.getSignedUrlPromise('getObject', s3Params)
  return {
    imageUrl: imageUrl,
  }
}
export const getImageUrlArray: RequestHandler = async (req, res) => {
  res.json(
    await statusgetImageURLArray([
      'events/ad59610f-40bb-4577-b574-c0e9559538e5',
      'events/e21f468f-6ab1-4942-aca6-7859689e8939',
      'events/a383f074-8db6-4f9c-936d-87dfaad045d6',
    ]),
  )
}
export const statusgetImageURLArray = async (keys: string[]) => {
  const s3Params = {
    Bucket: bucketName,
    Prefix: 'events/',
  }
  let objectsList: any = {}
  objectsList = await s3.getSignedUrlPromise("listObjectsV2", s3Params)

  return objectsList
}

export const deleteFile = (fileKey: any) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  }

  return s3.deleteObject(deleteParams).promise()
}

//////DEPRICATED//////////
export const getFileStream = (folder: string, fileKey: string) => {
  const downloadParams = {
    Key: `${folder}/${fileKey}`,
    Bucket: bucketName,
  }

  process.stdout.write(`\n${bucketName}\n`)

  return s3.getObject(downloadParams).createReadStream()
}
export const getImage: RequestHandler = async (req, res) => {
  const key = req.params.key
  const folder = req.params.folder
  const readStream = getFileStream(folder, key)

  readStream.pipe(res)
}
///////////////////////
