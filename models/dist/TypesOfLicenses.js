"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var Car_1 = require("./Car");
var Event_1 = require("./Event");
var TypeOfLicense = database_1["default"].define('typeOfLicense', {
    id: {
        type: sequelize_1["default"].INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    licenseId: {
        type: sequelize_1["default"].INTEGER,
        references: {
            model: Car_1["default"],
            key: 'id'
        }
    },
    licenseTypeName: {
        type: sequelize_1["default"].INTEGER,
        references: {
            model: Event_1["default"],
            key: 'name'
        }
    }
});
exports["default"] = TypeOfLicense;
