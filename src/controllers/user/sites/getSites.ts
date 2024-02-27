
import { siteServices } from "../../../services";

export const getSites = async (req:any, res:any) => {
  return await siteServices.getSites(req, res);
};
