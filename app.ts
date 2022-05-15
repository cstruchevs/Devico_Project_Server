import express, { Application } from 'express'
const app: Application = express()

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
//Models
import User from './models/User'
import Car from './models/Car'
import Event from './models/Event'
import EventParticipants from './models/EventParticipants'
import License from './models/License'
import LicenseType from './models/LicenseType'
import LicenseMembers from './models/LicenseMembers'
import DriversData from './models/DriversData'

dotenv.config()

app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
)
app.use(express.json())

app.use('/news', newsRouter)
app.use('/events', eventsRouter)
app.use('/cars', carsRouter)
app.use('/license', licenseRouter)
app.use(authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

User.hasOne(DriversData, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
User.hasMany(Car, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
User.belongsToMany(License, { through: LicenseMembers })
License.belongsToMany(User, { through: LicenseMembers })
LicenseType.hasMany(License, {
  foreignKey: 'licenseType_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//EventParticipants.hasMany(Car, { foreignKey: 'eventParticipants_id' })
User.belongsToMany(Event, { through: EventParticipants })
Event.belongsToMany(User, { through: EventParticipants })

const port = 5000

const start = (): void => {
  sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`)
      })
    })
    .catch((err: Error) => {
      console.log(err)
    })
}
start()
