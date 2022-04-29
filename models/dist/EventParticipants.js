"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var Event_1 = require("./Event");
var User_1 = require("./User");
var EventParticipants = database_1["default"].define("evet-participants", {
    userId: {
        type: sequelize_1["default"].INTEGER,
        references: {
            model: User_1["default"],
            key: 'id'
        }
    }, eventId: {
        type: sequelize_1["default"].INTEGER,
        references: {
            model: Event_1["default"],
            key: 'id'
        }
    }
});
exports["default"] = EventParticipants;
