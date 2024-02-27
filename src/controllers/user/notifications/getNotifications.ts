
import { notificationServices } from "../../../services";

export const getNotifications = async (req:any, res:any) => {
  return await notificationServices.getNotificationsByUserId(req, res);
};
