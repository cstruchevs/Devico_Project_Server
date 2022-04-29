import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api'

class UnAuthenticatedError extends CustomAPIError {
    public statusCude:number = StatusCodes.UNAUTHORIZED
  constructor(message:string) {
    super(message)
  }
}

export default UnAuthenticatedError
