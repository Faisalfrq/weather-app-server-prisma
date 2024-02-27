
import { authServices } from "../../../services";

export const confirmLogin = async (req:any, res:any) => {
  return await authServices.confirmOTPAndLogin(req, res);
};
