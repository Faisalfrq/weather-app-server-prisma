const express= require("express");
import { getSites } from "./sites/getSites";
const routes = express.Router();

module.exports = () => {
  routes.get("/site", getSites);
  return routes;
};
