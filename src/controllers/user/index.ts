import express from "express"
import { getSites } from "./sites/getSites";
const routes = express.Router();

export const user = () => {
  routes.get("/site", getSites);
  return routes;
};
