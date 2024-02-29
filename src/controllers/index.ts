import express from "express"
const user = require("./user")
const admin = require("./admin")
const routes = express.Router();

module.exports = () => {
  routes.use("/user", user());
  routes.use("/admin", admin());
  return routes;
};

// ? http://localhost:4000/trainee/assignments
// paths
