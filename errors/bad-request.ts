import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api'

class BadRequestError extends CustomAPIError {
    public statusCude:number = StatusCodes.BAD_REQUEST
  constructor(message:string) {
    super(message)
  }
}

export default BadRequestError
