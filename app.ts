import express, { Application } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

export const app: Application = express()
export const httpServer = createServer(app)
export const io = new Server(httpServer, {})

//utils
import 'express-async-errors'
import dotenv from 'dotenv'
import cors from 'cors'
//Middlewares
import notFoundMiddleware from './middleware/not-found'
import errorHandlerMiddleware from './middleware/error-handler'
import sequelize from './db/database'
import auth from './middleware/auth'
//Routes
import newsRouter from './routes/newsRoutes'
import authRouter from './routes/authRoutes'
import carsRouter from './routes/carsRoutes'
import eventsRouter from './routes/eventsRoutes'
import licenseRouter from './routes/licenseRoutes'
import userRouter from './routes/userRoutes'
import imageRouter from './routes/imageRoutes'
import notificationsRouter from './routes/notificationsRoutes'

dotenv.config()

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.56.1:3000'],
  }),
)

app.use(express.json())

app.use('/news', newsRouter)
app.use('/events', eventsRouter)
app.use('/cars', carsRouter)
app.use('/license', licenseRouter)
app.use(authRouter)
app.use('/user', userRouter)
app.use('/image', imageRouter)
app.use('/notifications', notificationsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env['PORT']

const start = (): void => {
  sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
      httpServer.listen(port, () => {
        console.log(`Server is listening on port ${port}...`)
      })
    })
    .catch((err: Error) => {
      console.log(err)
    })

  io.on('connection', socket => {
    process.stdout.write(`User Connected: ${socket.id}`)

    socket.on('join_room', data => {
      socket.join(`user_${data}`)
    })
  })
}

start()
