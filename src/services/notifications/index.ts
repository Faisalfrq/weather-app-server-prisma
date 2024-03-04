import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from "../../lib/db"; // Import existing Prisma client instance
import { io } from '../../..';

export const getNotificationsByUserId = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || !process.env.USER_SECRET) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.USER_SECRET) as { userId: string } | undefined;

    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = decodedToken.userId;

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

export const updateNotificationById = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.body;

    // Update notification with the given ID and set isRead to true
    const updatedNotification = await db.notification.update({
      where: {
        id: notificationId
      },
      data: {
        isRead: true
      }
    });

    return res.status(200).json({ message: 'Notification updated successfully', notification: updatedNotification });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

let lastNotificationTimestamp: Date | null = null;

// Function to poll for new notifications and emit only the latest one to clients
const pollForNotificationsAndEmit = async () => {
  try {
    // Query for new notifications with a timestamp greater than the last poll
    const newNotifications = await db.notification.findMany({
      where: {
        createdAt: {
          gt: lastNotificationTimestamp ?? undefined // Only get notifications created after the last poll
        }
      },
      orderBy: {
        createdAt: 'desc' // Order by createdAt in descending order to get the latest notification first
      },
      take: 1 // Limit the result to 1 to get only the latest notification
    });

    if (newNotifications.length > 0) {
      // Update the last notification timestamp to the latest notification's timestamp
      lastNotificationTimestamp = newNotifications[0].createdAt;

      // Emit the latest new notification to all clients
      io.emit('notifications', newNotifications);
      // console.log('New notification emitted:', newNotifications[0]);
    }
  } catch (error) {
    console.error('Error while polling for notifications:', error);
  }
};

// Set up polling interval (e.g., poll every 10 seconds)
const pollingInterval = 1000; // 1 second
setInterval(pollForNotificationsAndEmit, pollingInterval);
