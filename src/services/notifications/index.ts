import { Request, Response } from 'express';
import { db } from "../../lib/db";

export const getNotificationsByUserId = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing in query parameters' });
    }

    // Find notifications for the given user ID
    const notifications = await db.notification.findMany({
      where: {
        userId: userId
      }
    });

    return res.status(200).json({ message: 'Notifications retrieved successfully', notifications });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
