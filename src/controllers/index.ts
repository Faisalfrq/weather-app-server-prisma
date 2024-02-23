import express from "express"
const user = require("./user/index.ts")
const routes = express.Router();

module.exports = () => {
  routes.use("/user", user());
  return routes;
};

// ? http://localhost:4000/trainee/assignments
// paths
