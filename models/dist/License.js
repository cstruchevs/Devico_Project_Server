"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var License = database_1["default"].define("license", {
    id: {
        type: sequelize_1["default"].INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullNameUK: { type: sequelize_1["default"].STRING, allowNull: false },
    fullNameLat: { type: sequelize_1["default"].STRING, allowNull: false },
    dob: { type: sequelize_1["default"].DATE, allowNull: false },
    nativeCity: { type: sequelize_1["default"].STRING, allowNull: false },
    address: { type: sequelize_1["default"].STRING, allowNull: false },
    identificationNum: { type: sequelize_1["default"].STRING, allowNull: false },
    email: { type: sequelize_1["default"].STRING, allowNull: false },
    phone: { type: sequelize_1["default"].STRING, allowNull: false },
    status: { type: sequelize_1["default"].STRING, allowNull: false }
});
exports["default"] = License;
