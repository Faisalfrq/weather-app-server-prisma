
import { userServices } from "../../../services";

export const getSites = async (req:any, res:any) => {
  return await userServices.getSites(req, res);
};
