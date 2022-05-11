"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var LicenseType = database_1["default"].define("licenseType", {
    id: {
        type: sequelize_1["default"].INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: sequelize_1["default"].STRING, allowNull: false },
    cost: { type: sequelize_1["default"].STRING, allowNull: false },
    description: { type: sequelize_1["default"].STRING, allowNull: false }
});
exports["default"] = LicenseType;
