import { Request, Response } from 'express';
import { db } from '../../lib/db'; // Import existing Prisma client instance
import { io } from '../../..';

let previousNotificationCount = 0;

const checkNewNotifications = async () => {
  try {
    const notifications = await db.notification.findMany();
    const currentNotificationCount = notifications.length;

    if (currentNotificationCount > previousNotificationCount) {
      io.emit('Admin-Notifications', { message: 'New notifications' });
      console.log('Notification Emitted')
      previousNotificationCount = currentNotificationCount;
    }
  } catch (error) {
    console.error('Error checking for new notifications:', error);
  }
};

// Poll for new notifications every 3 seconds
setInterval(checkNewNotifications, 5000);

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await db.notification.findMany();
    previousNotificationCount = notifications.length; // Update previous count
    return res.status(200).json({ message: 'All notifications retrieved successfully', notifications });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
