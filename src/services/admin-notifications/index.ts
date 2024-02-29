import { Request, Response } from 'express';
import { db } from '../../lib/db'; // Import existing Prisma client instance

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    // Retrieve all notifications from the database
    const notifications = await db.notification.findMany();

    return res.status(200).json({ message: 'All notifications retrieved successfully', notifications });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
