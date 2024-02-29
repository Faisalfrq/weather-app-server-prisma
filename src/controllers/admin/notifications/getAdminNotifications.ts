import { adminNotificationServices } from "../../../services";

export const getAllNotifications = async (req:any, res:any) => {
  return await adminNotificationServices.getAllNotifications(req, res);
};
