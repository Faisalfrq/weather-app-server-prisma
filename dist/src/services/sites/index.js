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
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeFromSite = exports.subscribeToSite = exports.getSites = void 0;
var db_1 = require("../../lib/db");
var getSites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sites, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db.site.findMany()];
            case 1:
                sites = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Retrieved Success.", sites: sites })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSites = getSites;
var subscribeToSite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, siteId, existingSubscription, newSubscription, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, siteId = _a.siteId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.db.subscriptions.findFirst({
                        where: {
                            userId: userId,
                            siteId: siteId
                        }
                    })];
            case 2:
                existingSubscription = _b.sent();
                if (existingSubscription) {
                    return [2 /*return*/, res.status(400).json({ message: 'User is already subscribed to this site' })];
                }
                return [4 /*yield*/, db_1.db.subscriptions.create({
                        data: {
                            userId: userId,
                            siteId: siteId,
                            isActive: true
                        }
                    })];
            case 3:
                newSubscription = _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Subscription successful', subscription: newSubscription })];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.subscribeToSite = subscribeToSite;
var unsubscribeFromSite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, siteId, existingSubscription, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, siteId = _a.siteId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.db.subscriptions.findFirst({
                        where: {
                            userId: userId,
                            siteId: siteId
                        }
                    })];
            case 2:
                existingSubscription = _b.sent();
                if (!existingSubscription) {
                    return [2 /*return*/, res.status(400).json({ message: 'User is not subscribed to this site' })];
                }
                // Update the subscription to set isActive to false
                return [4 /*yield*/, db_1.db.subscriptions.update({
                        where: {
                            id: existingSubscription.id
                        },
                        data: {
                            isActive: false
                        }
                    })];
            case 3:
                // Update the subscription to set isActive to false
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Unsubscription successful' })];
            case 4:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: error_3.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.unsubscribeFromSite = unsubscribeFromSite;
