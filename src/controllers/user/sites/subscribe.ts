
import { siteServices } from "../../../services";

export const subscribeSite = async (req:any, res:any) => {
  return await siteServices.subscribeToSite(req, res);
};
