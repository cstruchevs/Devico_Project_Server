import { RequestHandler } from "express"

const notFoundMiddleware:RequestHandler = (req, res) =>
  res.status(404).send('Route does not exist')

export default notFoundMiddleware
