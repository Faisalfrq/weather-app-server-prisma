
import { siteServices } from "../../../services";

export const unsubscribeSite = async (req:any, res:any) => {
  return await siteServices.unsubscribeFromSite(req, res);
};
