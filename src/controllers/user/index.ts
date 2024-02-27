import express from "express"
import { registerUser } from "./auth/registerUser";
import { loginUser } from "./auth/loginUser";
import { getSites } from "./sites/getSites";
import { getUsers } from "./auth/getUsers";
import { confirmSignup } from "./auth/confirmSignupOtp";
import { confirmLogin } from "./auth/confirmLoginOtp";
import { subscribeSite } from "./sites/subscribe";
import { unsubscribeSite } from "./sites/unsubscribe";
import { getSubscriptions } from "./sites/getSubscriptions";
import { getNotifications } from "./notifications/getNotifications";
const routes = express.Router();

module.exports = () => {
  routes.post("/auth/register",registerUser );
  routes.post("/auth/register-confirm",confirmSignup );
  routes.post("/auth/login", loginUser);
  routes.post("/auth/login-confirm", confirmLogin);
  routes.get("/users", getUsers);
  routes.get("/site", getSites);
  routes.get("/subscriptions", getSubscriptions);
  routes.post("/subscribe", subscribeSite);
  routes.post("/unsubscribe", unsubscribeSite);
  routes.get("/notifications", getNotifications);
  return routes;
};
