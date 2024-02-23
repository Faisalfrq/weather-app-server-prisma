import express from "express"
const getSites = require("./sites/getSites.ts")
const routes = express.Router();

module.exports = () => {
  routes.get("/site", getSites);
  return routes;
};
