"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getAdminNotifications_1 = require("./notifications/getAdminNotifications");
var routes = express_1.default.Router();
module.exports = function () {
    routes.get("/notifications", getAdminNotifications_1.getAllNotifications);
    return routes;
};
