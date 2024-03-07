"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var registerUser_1 = require("./auth/registerUser");
var getSites_1 = require("./sites/getSites");
var confirmSignupOtp_1 = require("./auth/confirmSignupOtp");
var subscribe_1 = require("./sites/subscribe");
var unsubscribe_1 = require("./sites/unsubscribe");
var getNotifications_1 = require("./notifications/getNotifications");
var getUserById_1 = require("./auth/getUserById");
var user_auth_1 = __importDefault(require("../../middlewares/user.auth"));
var auth_1 = require("../../services/auth");
var updateNotification_1 = require("./notifications/updateNotification");
var routes = express_1.default.Router();
module.exports = function () {
    routes.post("/auth/register", registerUser_1.registerUser);
    routes.post("/auth/register-confirm", confirmSignupOtp_1.confirmSignup);
    routes.get("/user-by-id", user_auth_1.default, getUserById_1.getUserById);
    routes.get("/users", auth_1.getUsers);
    routes.get("/site", user_auth_1.default, getSites_1.getSites);
    routes.post("/subscribe", subscribe_1.subscribeSite);
    routes.post("/unsubscribe", unsubscribe_1.unsubscribeSite);
    routes.get("/notifications", user_auth_1.default, getNotifications_1.getNotifications);
    routes.put("/notifications", user_auth_1.default, updateNotification_1.updateNotificationById);
    return routes;
};
