
import { authServices } from "../../../services";

export const loginUser = async (req:any, res:any) => {
  return await authServices.login(req, res);
};
