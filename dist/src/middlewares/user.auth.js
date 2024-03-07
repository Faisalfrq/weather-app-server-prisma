"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var userMiddleware = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, process.env.USER_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = {
            id: decoded.id,
        };
        next();
    });
};
exports.default = userMiddleware;
