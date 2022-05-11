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
exports.deleteLicenseType = exports.deleteLicense = exports.getLicenses = exports.userRegisterLicense = exports.postLicenseType = exports.postLicense = void 0;
var http_status_codes_1 = require("http-status-codes");
var errors_1 = require("../errors");
var License_1 = require("../models/License");
var LicenseType_1 = require("../models/LicenseType");
var LicenseMembers_1 = require("../models/LicenseMembers");
exports.postLicense = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullNameUK, fullNameLat, dob, nativeCity, address, idNumber, email, phone, identificationNum, licenseName, licenseType_id, status, licenseType, license;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fullNameUK = _a.fullNameUK, fullNameLat = _a.fullNameLat, dob = _a.dob, nativeCity = _a.nativeCity, address = _a.address, idNumber = _a.idNumber, email = _a.email, phone = _a.phone, identificationNum = _a.identificationNum, licenseName = _a.licenseName, licenseType_id = _a.licenseType_id, status = _a.status;
                if (!fullNameUK ||
                    !fullNameLat ||
                    !dob ||
                    !nativeCity ||
                    !address ||
                    !idNumber ||
                    !identificationNum ||
                    !email ||
                    !phone ||
                    !licenseName ||
                    !licenseType_id) {
                    throw new errors_1.BadRequestError('please provide all values');
                }
                return [4 /*yield*/, LicenseType_1["default"].findOne({ where: { name: licenseName } })];
            case 1:
                licenseType = _b.sent();
                if (!licenseType) {
                    throw new errors_1.UnAuthenticatedError('Invalid Credentials');
                }
                if (!status) {
                    status = 'no Paid';
                }
                return [4 /*yield*/, licenseType.createLicense({
                        fullNameUK: fullNameUK,
                        fullNameLat: fullNameLat,
                        dob: dob,
                        identificationNum: identificationNum,
                        nativeCity: nativeCity,
                        address: address,
                        idNumber: idNumber,
                        email: email,
                        phone: phone,
                        status: status,
                        licenseType_id: licenseType_id
                    })];
            case 2:
                license = _b.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(license);
                return [2 /*return*/];
        }
    });
}); };
exports.postLicenseType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, cost, description, licenseType;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, cost = _a.cost, description = _a.description;
                if (!name || !cost || !description) {
                    throw new errors_1.BadRequestError('please provide all values');
                }
                return [4 /*yield*/, LicenseType_1["default"].create({
                        name: name,
                        cost: cost,
                        description: description
                    })];
            case 1:
                licenseType = _b.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(licenseType);
                return [2 /*return*/];
        }
    });
}); };
exports.userRegisterLicense = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, licenseId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.id, licenseId = _a.licenseId;
                if (!userId || !licenseId) {
                    throw new errors_1.BadRequestError('please provide all values');
                }
                return [4 /*yield*/, LicenseMembers_1["default"].create({ userId: userId, licenseId: licenseId })];
            case 1:
                _b.sent();
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json("User with id " + userId + " registered to the license with id " + licenseId);
                return [2 /*return*/];
        }
    });
}); };
exports.getLicenses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var licenses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, LicenseType_1["default"].findAll({
                    include: ["licenses"]
                })];
            case 1:
                licenses = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(licenses);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteLicense = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, licenses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    throw new errors_1.BadRequestError('Please provide id');
                }
                return [4 /*yield*/, License_1["default"].destroy({ where: { id: id } })];
            case 1:
                licenses = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(licenses);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteLicenseType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, licenses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    throw new errors_1.BadRequestError('Please provide id');
                }
                return [4 /*yield*/, LicenseType_1["default"].destroy({ where: { id: id } })];
            case 1:
                licenses = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(licenses);
                return [2 /*return*/];
        }
    });
}); };
