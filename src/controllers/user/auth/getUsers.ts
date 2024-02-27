
import { authServices } from "../../../services";

export const getUsers = async (req:any, res:any) => {
  return await authServices.getUsers(req, res);
};
