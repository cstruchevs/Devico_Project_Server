import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index'

const auth: RequestHandler = async (req: any, res, next) => {
 
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw res.status(401).json({message: authHeader})
    // throw new UnAuthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload: any = jwt.verify(token, 'jwtsecret')
    req.user = { userId: payload.userId }

    next()
  } catch (error) {
    res.status(401)
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

export default auth
