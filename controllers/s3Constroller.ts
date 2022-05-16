import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

const bucketName: string = process.env['AWS_BUCKET_NAME'] as string
const region: string = process.env['AWS_BUCKET_REGION'] as string
const accessKeyId: string = process.env['AWS_ACCESS_KEY'] as string
const secretAccessKey: string = process.env['AWS_SECRET_KEY'] as string

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
})

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
export const getFileStream = (folder: any, fileKey: any) => {
  const downloadParams = {
    Key: `${folder}/${fileKey}`,
    Bucket: bucketName,
  }

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
