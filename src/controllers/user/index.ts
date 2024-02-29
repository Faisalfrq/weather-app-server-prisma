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
const routes = express.Router();

module.exports = () => {
  routes.post("/auth/register",registerUser );
  routes.post("/auth/register-confirm",confirmSignup );
  routes.get("/user-by-id",userMiddleware, getUserById);
  routes.get("/users", getUsers);
  routes.get("/site",userMiddleware, getSites);
  routes.post("/subscribe", subscribeSite);
  routes.post("/unsubscribe", unsubscribeSite);
  routes.get("/notifications",userMiddleware, getNotifications);
  return routes;
};
