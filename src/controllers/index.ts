import express from "express"
import { user } from "./user";
const routes = express.Router();

export const AppRoutes = () => {
  routes.use("/user", user());
  return routes;
};

// ? http://localhost:4000/trainee/assignments
// paths
