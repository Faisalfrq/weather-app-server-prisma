
import { siteServices } from "../../../services";

export const getUserSubscriptions = async (req:any, res:any) => {
  return await siteServices.getUserSubscriptions(req, res);
};
