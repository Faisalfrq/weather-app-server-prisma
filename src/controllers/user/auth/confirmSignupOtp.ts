
import { authServices } from "../../../services";

export const confirmSignup = async (req:any, res:any) => {
  return await authServices.confirmOTPAndSignUp(req, res);
};
