import express, { Application } from "express";
const app: Application = express();

import dotenv from "dotenv";
import { Error } from "sequelize/types";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import sequelize from "./db/database";

dotenv.config();

app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = ():void => {
  sequelize
    .sync()
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
