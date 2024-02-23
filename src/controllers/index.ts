import express from "express"
import { user } from "./user";
const routes = express.Router();

module.exports = () => {
  routes.use("/user", user());
  return routes;
};

// ? http://localhost:4000/trainee/assignments
// paths
