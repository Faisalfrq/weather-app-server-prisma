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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUserById = exports.confirmOTPAndSignUp = exports.signUp = void 0;
var db_1 = require("../../lib/db");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Simulated OTP for testing
var staticOTP = "123456"; // Static 6-digit OTP for testing
// Map to store pending signups awaiting OTP confirmation
var pendingSignUps = {};
// Function to simulate OTP generation and sending
var generateOTP = function (contact) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
// Function to generate JWT token
var generateToken = function (userId) {
    // Calculate expiry time for 2 months from now
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 2);
    // Generate the token with expiresIn option set to 2 months
    return jsonwebtoken_1.default.sign({ userId: userId }, process.env.USER_SECRET, {
        expiresIn: expiryDate.getTime(),
    });
};
// Function to handle user sign-up request
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var phone_number, existingUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone_number = req.body.phone_number;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, generateOTP(phone_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, db_1.db.user.findUnique({ where: { phone_number: phone_number } })];
            case 3:
                existingUser = _a.sent();
                if (existingUser) {
                    // User already exists
                    return [2 /*return*/, res.status(200).json({
                            message: "You already have an account, confirm otp and continue",
                        })];
                }
                pendingSignUps[phone_number] = { phone_number: phone_number };
                // New signup
                return [2 /*return*/, res.status(200).json({
                        message: "OTP has been sent to your mobile number. Please confirm OTP to complete signup.",
                    })];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
// Function to handle OTP confirmation and complete signup process
var confirmOTPAndSignUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, phone_number, otp, existingUser, token_1, newUser, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, phone_number = _a.phone_number, otp = _a.otp;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!phone_number || !otp) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Phone number and OTP are required" })];
                }
                return [4 /*yield*/, db_1.db.user.findUnique({ where: { phone_number: phone_number } })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    if (otp !== staticOTP) {
                        return [2 /*return*/, res.status(400).json({ message: "Invalid OTP" })];
                    }
                    token_1 = generateToken(existingUser.id);
                    return [2 /*return*/, res.status(200).json({ message: "Login successful", token: token_1 })];
                }
                if (otp !== staticOTP) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid OTP" })];
                }
                return [4 /*yield*/, db_1.db.user.create({
                        data: {
                            phone_number: phone_number,
                            isActive: true,
                        },
                    })];
            case 3:
                newUser = _b.sent();
                token = generateToken(newUser.id);
                return [2 /*return*/, res
                        .status(201)
                        .json({ message: "User created successfully", token: token })];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.confirmOTPAndSignUp = confirmOTPAndSignUp;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, decodedToken, userId, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authHeader = req.headers["authorization"];
                token = authHeader && authHeader.split(" ")[1];
                if (!token || !process.env.USER_SECRET) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.USER_SECRET);
                if (!decodedToken || !decodedToken.userId) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                userId = decodedToken.userId;
                return [4 /*yield*/, db_1.db.user.findUnique({
                        where: { id: userId },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                }
                return [2 /*return*/, res.status(200).json({ user: user })];
            case 2:
                err_1 = _a.sent();
                console.log("Something went wrong: " + err_1.message);
                return [2 /*return*/, res.status(500).json({ error: "Server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db.user.findMany()];
            case 1:
                users = _a.sent();
                // Return the list of users in the response
                return [2 /*return*/, res.status(200).json({ users: users })];
            case 2:
                err_2 = _a.sent();
                console.log("Something went wrong: " + err_2.message);
                return [2 /*return*/, res.status(500).json({ error: "Server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
