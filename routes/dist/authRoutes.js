"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var authConroller_1 = require("../controllers/authConroller");
var express_rate_limit_1 = require("express-rate-limit");
var apiLimiter = express_rate_limit_1["default"]({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
router.route('/register').post(authConroller_1.register);
router.route('/login').post(authConroller_1.login);
router.route('/update').patch(authConroller_1.updateUser);
router.route('/driversData').post(authConroller_1.updateDriversData);
router.route('/driversData').get(authConroller_1.getUsersDriversData);
exports["default"] = router;
