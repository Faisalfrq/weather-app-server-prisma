"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user = require("./user");
var admin = require("./admin");
var routes = express_1.default.Router();
module.exports = function () {
    routes.use("/user", user());
    routes.use("/admin", admin());
    return routes;
};
// ? http://localhost:4000/trainee/assignments
// paths
