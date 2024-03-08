import { Request, Response } from 'express';
import { db } from "../../lib/db";

export const getSites = async (req: Request, res: Response) => {
  try {
    const sites = await db.site.findMany();
    return res.status(200).json({ message: "Retrieved Success.", sites });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const subscribeToSite = async (req: Request, res: Response) => {
  const { userId, siteId } = req.body;

  try {
    // Check if the subscription already exists
    const existingSubscription = await db.subscription.findFirst({
      where: {
        userId: userId,
        siteId: siteId
      }
    });

    if (existingSubscription) {
      return res.status(400).json({ message: 'User is already subscribed to this site' });
    }

    // Create the new subscription
    const newSubscription = await db.subscription.create({
      data: {
        userId: userId,
        siteId: siteId,
        isActive: true
      }
    });

    return res.status(200).json({ message: 'Subscription successful', subscription: newSubscription });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const unsubscribeFromSite = async (req: Request, res: Response) => {
  const { userId, siteId } = req.body;

  try {
    // Check if the subscription exists
    const existingSubscription = await db.subscription.findFirst({
      where: {
        userId: userId,
        siteId: siteId
      }
    });

    if (!existingSubscription) {
      return res.status(400).json({ message: 'User is not subscribed to this site' });
    }

    // Update the subscription to set isActive to false
    await db.subscription.update({
      where: {
        id: existingSubscription.id
      },
      data: {
        isActive: false
      }
    });

    return res.status(200).json({ message: 'Unsubscription successful' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
