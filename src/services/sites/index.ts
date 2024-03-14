import { Request, Response } from 'express';
import { db } from "../../lib/db";

// Function to retrieve all sites along with their subscription status
export const getSites = async (req: Request, res: Response) => {
  try {
    // Fetch all sites
    const sites = await db.site.findMany();

    // Fetch subscriptions for the current user
    const { userId } = req.body;
    const userSubscriptions = await db.subscription.findMany({
      where: {
        userId: userId,
        siteId: { in: sites.map(site => site.id) } // Filter subscriptions for the fetched sites
      }
    });

    // Append subscription status (isActive flag) to each site
    const sitesWithSubscriptionStatus = sites.map(site => {
      const subscription = userSubscriptions.find(sub => sub.siteId === site.id);
      const isActive = subscription ? subscription.isActive : false;
      return { ...site, isActive };
    });

    return res.status(200).json({ message: "Retrieved Success.", sites: sitesWithSubscriptionStatus });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving sites: " + (error as Error).message });
  }
};


// Function to subscribe to a site or update subscription if already exists
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
      // Update the existing subscription to set isActive to true
      await db.subscription.update({
        where: {
          id: existingSubscription.id
        },
        data: {
          isActive: true
        }
      });
      return res.status(200).json({ message: 'Subscribed Successfully' });
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
    return res.status(500).json({ message: "Error subscribing to site: " + (error as Error).message });
  }
};

// Function to unsubscribe from a site
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
    return res.status(500).json({ message: "Error unsubscribing from site: " + (error as Error).message });
  }
};

// Function to get all subscriptions of a user
export const getUserSubscriptions = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    // Find all subscriptions of the user, regardless of isActive status
    const userSubscriptions = await db.subscription.findMany({
      where: {
        userId: userId,
      },
      include: {
        site: true
      }
    });

    return res.status(200).json({ message: 'User subscriptions retrieved successfully', subscriptions: userSubscriptions });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user subscriptions: " + (error as Error).message });
  }
};
