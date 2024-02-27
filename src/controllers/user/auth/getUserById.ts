
import { authServices } from "../../../services";

export const getUserById = async (req:any, res:any) => {
  return await authServices.getUserById(req, res);
};
