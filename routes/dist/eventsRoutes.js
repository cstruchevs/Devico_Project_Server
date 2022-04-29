"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var eventController_1 = require("../controllers/eventController");
router.route('/post').post(eventController_1.postEvent);
router.route('/registerToEvent').post(eventController_1.userRegisterEvent);
router.route('/delete/:id')["delete"](eventController_1.deleteEvent);
router.route('/update').patch(eventController_1.updateEvent);
router.route('/allEvents').get(eventController_1.getAllEvents);
router.route('/oneEvent/:id').get(eventController_1.getOneEvent);
router.route('/usersEvents/:id').get(eventController_1.getEventForOneUser);
exports["default"] = router;
