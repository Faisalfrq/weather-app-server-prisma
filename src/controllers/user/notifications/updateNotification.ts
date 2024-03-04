
import { notificationServices } from "../../../services";

export const updateNotificationById = async (req:any, res:any) => {
  return await notificationServices.updateNotificationById(req, res);
};
