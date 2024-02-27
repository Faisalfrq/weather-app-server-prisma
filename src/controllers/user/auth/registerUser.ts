
import { authServices } from "../../../services";

export const registerUser = async (req:any, res:any) => {
  return await authServices.signUp(req, res);
};
