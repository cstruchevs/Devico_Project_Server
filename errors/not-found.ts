import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'

class NotFoundError extends CustomAPIError {
    public statusCude = StatusCodes.NOT_FOUND
  constructor(message:string) {
    super(message)
  }
}

export default NotFoundError
