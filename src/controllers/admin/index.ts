import express from "express"
import { getAllNotifications } from "./notifications/getAdminNotifications";
const routes = express.Router();

module.exports = () => {
  routes.get("/notifications", getAllNotifications);
  return routes;
};
