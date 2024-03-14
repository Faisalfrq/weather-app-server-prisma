import express from "express"
import { registerUser } from "./auth/registerUser";
import { getSites } from "./sites/getSites";
import { confirmSignup } from "./auth/confirmSignupOtp";
import { subscribeSite } from "./sites/subscribe";
import { unsubscribeSite } from "./sites/unsubscribe";
import { getNotifications } from "./notifications/getNotifications";
import { getUserById } from "./auth/getUserById";
import userMiddleware from "../../middlewares/user.auth";
import { getUsers } from "../../services/auth";
import { updateNotificationById } from "./notifications/updateNotification";
import { getUserSubscriptions } from "./sites/getSubscriptions";
const routes = express.Router();

module.exports = () => {
  routes.post("/auth/register",registerUser );
  routes.post("/auth/register-confirm",confirmSignup );
  routes.get("/user-by-id",userMiddleware, getUserById);
  routes.get("/users", getUsers);
  routes.get("/site",userMiddleware, getSites);
  routes.get("/user-subscriptions",userMiddleware, getUserSubscriptions);
  routes.post("/subscribe",userMiddleware, subscribeSite);
  routes.put("/unsubscribe",userMiddleware, unsubscribeSite);
  routes.get("/notifications",userMiddleware, getNotifications);
  routes.put("/notifications",userMiddleware, updateNotificationById);
  return routes;
};
