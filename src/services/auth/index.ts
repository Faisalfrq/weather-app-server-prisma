import { Request, Response } from "express";
import { db } from "../../lib/db";
import jwt, { Secret } from "jsonwebtoken";

// Simulated OTP for testing
const staticOTP = "123456"; // Static 6-digit OTP for testing

// Map to store pending signups awaiting OTP confirmation
const pendingSignUps: Record<string, { phone_number: string }> = {};

// Function to simulate OTP generation and sending
const generateOTP = async (contact: string) => {
  // In a real scenario, you'd generate a random OTP and send it via SMS or email
  // For testing purposes, we'll use a static OTP
};

// Function to generate JWT token
const generateToken = (userId: string) => {
  // Calculate expiry time for 2 months from now
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 2);

  // Generate the token with expiresIn option set to 2 months
  return jwt.sign({ userId }, process.env.USER_SECRET as Secret, {
    expiresIn: expiryDate.getTime(),
  });
};

// Function to handle user sign-up request
export const signUp = async (req: Request, res: Response) => {
  const { phone_number } = req.body;

  try {
    await generateOTP(phone_number);
    const existingUser = await db.user.findUnique({ where: { phone_number } });
    if (existingUser) {
      // User already exists
      return res.status(200).json({
        message: "You already have an account, confirm otp and continue",
      });
    }

    pendingSignUps[phone_number] = { phone_number };

    // New signup
    return res.status(200).json({
      message:
        "OTP has been sent to your mobile number. Please confirm OTP to complete signup.",
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Function to handle OTP confirmation and complete signup process
export const confirmOTPAndSignUp = async (req: Request, res: Response) => {
  const { phone_number, otp } = req.body;

  try {
    if (!phone_number || !otp) {
      return res
        .status(400)
        .json({ message: "Phone number and OTP are required" });
    }

    const existingUser = await db.user.findUnique({ where: { phone_number } });
    if (existingUser) {
      if (otp !== staticOTP) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      const token = generateToken(existingUser.id);
      return res.status(200).json({ message: "Login successful", token });
    }
    if (otp !== staticOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const newUser = await db.user.create({
      data: {
        phone_number,
        isActive: true,
      },
    });
    const token = generateToken(newUser.id);

    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || !process.env.USER_SECRET) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.USER_SECRET) as
      | { userId: string }
      | undefined;

    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = decodedToken.userId;

    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log("Something went wrong: " + (err as Error).message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Fetch all users from the database
    const users = await db.user.findMany();

    // Return the list of users in the response
    return res.status(200).json({ users: users });
  } catch (err) {
    console.log("Something went wrong: " + (err as Error).message);
    return res.status(500).json({ error: "Server error" });
  }
};
