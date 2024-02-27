
import { siteServices } from "../../../services";

export const getSubscriptions = async (req:any, res:any) => {
  return await siteServices.getSubscriptionsByUser(req, res);
};
