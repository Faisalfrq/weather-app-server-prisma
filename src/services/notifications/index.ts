import { Request, Response } from 'express';
import { db } from "../../lib/db";
import jwt from 'jsonwebtoken';

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
