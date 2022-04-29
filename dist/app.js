"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
//utils
require("express-async-errors");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
//Middlewares
var not_found_1 = require("./middleware/not-found");
var error_handler_1 = require("./middleware/error-handler");
var database_1 = require("./db/database");
//Routes
var authRoutes_1 = require("./routes/authRoutes");
var carsRoutes_1 = require("./routes/carsRoutes");
var eventsRoutes_1 = require("./routes/eventsRoutes");
//Models
var User_1 = require("./models/User");
var Car_1 = require("./models/Car");
var Event_1 = require("./models/Event");
var EventParticipants_1 = require("./models/EventParticipants");
dotenv_1["default"].config();
app.use(cors_1["default"]({
    origin: ['http://localhost:3000']
}));
app.use(express_1["default"].json());
app.use("/events", eventsRoutes_1["default"]);
app.use("/cars", carsRoutes_1["default"]);
app.use(authRoutes_1["default"]);
app.use(not_found_1["default"]);
app.use(error_handler_1["default"]);
User_1["default"].hasMany(Car_1["default"], { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
User_1["default"].belongsToMany(Event_1["default"], { through: EventParticipants_1["default"] });
Event_1["default"].belongsToMany(User_1["default"], { through: EventParticipants_1["default"] });
var port = process.env.PORT || 5000;
var start = function () {
    database_1["default"]
        .sync({ force: true })
        //.sync()
        .then(function () {
        app.listen(port, function () {
            console.log("Server is listening on port " + port + "...");
        });
    })["catch"](function (err) {
        console.log(err);
    });
};
start();
