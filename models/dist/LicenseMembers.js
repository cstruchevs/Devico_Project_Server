"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var License_1 = require("./License");
var User_1 = require("./User");
var LicenseMembers = database_1["default"].define("license-members", {
    id: {
        type: sequelize_1["default"].INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: sequelize_1["default"].INTEGER,
        references: {
            model: User_1["default"],
            key: 'id'
        }
    }, licenseId: {
        type: sequelize_1["default"].INTEGER,
        references: {
            model: License_1["default"],
            key: 'id'
        }
    }
});
exports["default"] = LicenseMembers;
