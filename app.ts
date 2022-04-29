import express, { Application } from "express"
const app: Application = express()

//utils
import "express-async-errors";
import dotenv from "dotenv"
import cors from 'cors'
//Middlewares
import notFoundMiddleware from "./middleware/not-found"
import errorHandlerMiddleware from "./middleware/error-handler"
import sequelize from "./db/database"
//Routes
import authRouter from "./routes/authRoutes"
import carsRouter from "./routes/carsRoutes"
import eventsRouter from "./routes/eventsRoutes"
//Models
import User from "./models/User";
import Car from "./models/Car";
import Event from "./models/Event";
import EventParticipants from "./models/EventParticipants";

dotenv.config();

app.use(cors({
  origin:['http://localhost:3000']
}))
app.use(express.json());

app.use("/events", eventsRouter)
app.use("/cars", carsRouter)
app.use(authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

User.hasMany(Car, {foreignKey: "user_id", onDelete: "CASCADE", onUpdate:"CASCADE"})
User.belongsToMany(Event, {through: EventParticipants})
Event.belongsToMany(User, {through: EventParticipants})

const port = process.env.PORT || 5000;

const start = (): void => {
  sequelize
    .sync({ force: true })
    //.sync()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};
start();
