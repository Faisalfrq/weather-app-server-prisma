"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getSites_1 = require("./sites/getSites");
var routes = express_1.default.Router();
module.exports = function () {
    routes.get("/site", getSites_1.getSites);
    return routes;
};
