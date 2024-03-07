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
exports.updateNotificationById = exports.getNotificationsByUserId = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var db_1 = require("../../lib/db"); // Import existing Prisma client instance
var __1 = require("../../..");
var getNotificationsByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, decodedToken, userId, notifications, error_1;
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
                return [4 /*yield*/, db_1.db.notification.findMany({
                        where: {
                            userId: userId
                        }
                    })];
            case 1:
                notifications = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Notifications retrieved successfully', notifications: notifications })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNotificationsByUserId = getNotificationsByUserId;
var updateNotificationById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var notificationId, updatedNotification, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                notificationId = req.body.notificationId;
                return [4 /*yield*/, db_1.db.notification.update({
                        where: {
                            id: notificationId
                        },
                        data: {
                            isRead: true
                        }
                    })];
            case 1:
                updatedNotification = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Notification updated successfully', notification: updatedNotification })];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateNotificationById = updateNotificationById;
var lastNotificationTimestamp = null;
// Function to poll for new notifications and emit only the latest one to clients
var pollForNotificationsAndEmit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var newNotifications, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db.notification.findMany({
                        where: {
                            createdAt: {
                                gt: lastNotificationTimestamp !== null && lastNotificationTimestamp !== void 0 ? lastNotificationTimestamp : undefined // Only get notifications created after the last poll
                            }
                        },
                        orderBy: {
                            createdAt: 'desc' // Order by createdAt in descending order to get the latest notification first
                        },
                        take: 1 // Limit the result to 1 to get only the latest notification
                    })];
            case 1:
                newNotifications = _a.sent();
                if (newNotifications.length > 0) {
                    // Update the last notification timestamp to the latest notification's timestamp
                    lastNotificationTimestamp = newNotifications[0].createdAt;
                    // Emit the latest new notification to all clients
                    __1.io.emit('notifications', newNotifications);
                    console.log('New notification emitted:', newNotifications[0]);
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Error while polling for notifications:', error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Set up polling interval (e.g., poll every 10 seconds)
var pollingInterval = 1000; // 1 second
setInterval(pollForNotificationsAndEmit, pollingInterval);
