"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUsersDriversData = exports.updateDriversData = exports.deleteUser = exports.updateUser = exports.login = exports.register = void 0;
var bcryptjs_1 = require("bcryptjs");
var User_1 = require("../models/User");
var http_status_codes_1 = require("http-status-codes");
var index_1 = require("../errors/index");
var DriversData_1 = require("../models/DriversData");
exports.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, phone, fullName, userAlreadyExists, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, phone = _a.phone, fullName = _a.fullName;
                if (!email || !password) {
                    throw new index_1.BadRequestError('please provide all values');
                }
                return [4 /*yield*/, User_1["default"].findOne({ where: { email: email } })];
            case 1:
                userAlreadyExists = _b.sent();
                if (userAlreadyExists) {
                    throw new index_1.BadRequestError('Email already in use');
                }
                return [4 /*yield*/, User_1["default"].create({
                        email: email,
                        password: password,
                        phone: phone,
                        fullName: fullName
                    })];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, user.createDriversData({})];
            case 3:
                _b.sent();
                token = user.createJWT();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    user: user,
                    token: token
                });
                return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordCorrect, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new index_1.BadRequestError('Please provide all values');
                }
                return [4 /*yield*/, User_1["default"].findOne({ where: { email: email } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new index_1.UnAuthenticatedError('Invalid Credentials');
                }
                return [4 /*yield*/, user.comparePassword(password)];
            case 2:
                isPasswordCorrect = _b.sent();
                if (!isPasswordCorrect) {
                    throw new index_1.UnAuthenticatedError('Invalid Credentials');
                }
                token = user.createJWT();
                res.status(http_status_codes_1.StatusCodes.OK).json({ user: user, token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, fullName, phone, password, id, user, hash, salt, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, fullName = _a.fullName, phone = _a.phone, password = _a.password, id = _a.id;
                return [4 /*yield*/, User_1["default"].findOne({ where: { id: id } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new index_1.UnAuthenticatedError('Invalid Credentials');
                }
                if (!password) return [3 /*break*/, 4];
                return [4 /*yield*/, bcryptjs_1["default"].genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, salt)];
            case 3:
                hash = _b.sent();
                _b.label = 4;
            case 4:
                user.update({ email: email, fullName: fullName, password: hash, phone: phone }, { where: { id: id } });
                token = user.createJWT();
                res.status(http_status_codes_1.StatusCodes.OK).json({ user: user, token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                if (!email) {
                    throw new index_1.BadRequestError('Please provide email');
                }
                return [4 /*yield*/, User_1["default"].destroy({ where: { email: email } })];
            case 1:
                _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json("Deleted user with email " + email);
                return [2 /*return*/];
        }
    });
}); };
exports.updateDriversData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, city, dob, regAdress, driverLicense, representiveFullName, representiveLicense, idNumber, sportDriverLicense, id, driversData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, city = _a.city, dob = _a.dob, regAdress = _a.regAdress, driverLicense = _a.driverLicense, representiveFullName = _a.representiveFullName, representiveLicense = _a.representiveLicense, idNumber = _a.idNumber, sportDriverLicense = _a.sportDriverLicense, id = _a.id;
                if (!id) {
                    throw new index_1.BadRequestError('Please provide all values');
                }
                return [4 /*yield*/, DriversData_1["default"].findOne({ where: { driversData: id } })];
            case 1:
                driversData = _b.sent();
                if (!driversData) {
                    throw new index_1.UnAuthenticatedError('Invalid Credentials');
                }
                driversData.update({
                    city: city,
                    dob: dob,
                    regAdress: regAdress,
                    driverLicense: driverLicense,
                    representiveFullName: representiveFullName,
                    representiveLicense: representiveLicense,
                    idNumber: idNumber,
                    sportDriverLicense: sportDriverLicense
                }, { where: { id: id } });
                res.status(http_status_codes_1.StatusCodes.OK).json(driversData);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsersDriversData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, driversData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (!id) {
                    throw new index_1.BadRequestError('Please provide all values');
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: id }
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, user.getDriversData()];
            case 2:
                driversData = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(driversData);
                return [2 /*return*/];
        }
    });
}); };
