"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var DriversData = database_1["default"].define("driversData", {
    id: {
        type: sequelize_1["default"].INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    city: { type: sequelize_1["default"].STRING, allowNull: true },
    dob: { type: sequelize_1["default"].DATE, allowNull: true },
    regAdress: { type: sequelize_1["default"].STRING, allowNull: true },
    driverLicense: { type: sequelize_1["default"].STRING, allowNull: true },
    representiveFullName: { type: sequelize_1["default"].STRING, allowNull: true },
    representiveLicense: { type: sequelize_1["default"].STRING, allowNull: true },
    idNumber: { type: sequelize_1["default"].STRING, allowNull: true },
    sportDriverLicense: { type: sequelize_1["default"].STRING, allowNull: true }
});
exports["default"] = DriversData;
