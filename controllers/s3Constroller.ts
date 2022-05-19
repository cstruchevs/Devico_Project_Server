import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import { RequestHandler } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const bucketName: string = process.env['AWS_BUCKET_NAME'] as string
const region: string = process.env['AWS_BUCKET_REGION'] as string
const accessKeyId: string = process.env['AWS_ACCESS_KEY'] as string
const secretAccessKey: string = process.env['AWS_SECRET_KEY'] as string
const URL_EXPIRATION_SECONDS = 300

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
})


export const getUploadImageUrl: RequestHandler = async (req, res) => {
  const folder = req.params.folder
  res.json(await statusgetUploadURL(folder))
}
export const getImageUrl: RequestHandler = async (req, res) => {
  const key = req.params.key
  const folder = req.params.folder
  res.json(await statusgetImageURL(folder, key))
}

export const statusgetUploadURL = async (folder: string) => {
  const randomID = parseInt(Math.random() * 10000000 + '')
  const Key = `${folder}/${randomID}`

  // Get signed URL from S3
  const s3Params = {
    Bucket: bucketName,
    Key: Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/*',
  }
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
  return ({
    uploadURL: uploadURL,
    Key,
  })
}
export const statusgetImageURL = async (folder: string, key: string) => {

  // Get signed URL from S3
  const s3Params = {
    Bucket: bucketName,
    Key: `${folder}/${key}`,
  }
  const imageUrl = await s3.getSignedUrlPromise('getObject', s3Params)
  return ({
    imageUrl: imageUrl,
  })
}

// uploads a file to s3
export const uploadFile = (filePath: any, fileName: any, folder: string | null) => {
  const fileStream = fs.createReadStream(filePath)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${folder}/${fileName}`,
  }

  return s3.upload(uploadParams).promise()
}

// downloads a file from s3
export const getFileStream = (folder: string, fileKey: string) => {
  const downloadParams = {
    Key: `${folder}/${fileKey}`,
    Bucket: bucketName,
  }

  process.stdout.write(`\n${bucketName}\n`)

  return s3.getObject(downloadParams).createReadStream()
}

// delete a file from s3
export const deleteFile = (fileKey: any) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  }

  return s3.deleteObject(deleteParams).promise()
}
