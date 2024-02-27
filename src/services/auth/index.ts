import { Request, Response } from 'express';
import { db } from "../../lib/db";

// Simulated OTP for testing
const staticOTP = "123456"; // Static 6-digit OTP for testing

// Map to store pending signups awaiting OTP confirmation
const pendingSignUps: Record<string, { name: string; sms_number: string }> = {};

// Function to simulate OTP generation and sending
const generateOTP = async (contact: string) => {
    // In a real scenario, you'd generate a random OTP and send it via SMS or email
    // For testing purposes, we'll use a static OTP
    console.log(`OTP generated and sent to ${contact}: ${staticOTP}`);
};

// Function to handle user sign-up request
export const signUp = async (req: Request, res: Response) => {
    const { name, sms_number } = req.body;

    try {
        // Check if the provided SMS number already exists in the database
        const existingUser = await db.user.findUnique({ where: { sms_number } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this mobile number" });
        }

        // Generate OTP and send to the user
        await generateOTP(sms_number);
        
        // Store user information temporarily until OTP confirmation
        pendingSignUps[sms_number] = { name, sms_number };

        // Send response indicating OTP has been sent
        return res.status(200).json({ message: "OTP has been sent to your mobile number. Please confirm OTP to complete signup." });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

// Function to handle OTP confirmation and complete signup process
export const confirmOTPAndSignUp = async (req: Request, res: Response) => {
    const { sms_number, otp } = req.body;

    try {
        // Check if there is a pending signup with the provided SMS number
        const pendingSignUp = pendingSignUps[sms_number];
        if (!pendingSignUp) {
            return res.status(404).json({ message: "No pending signup found for this mobile number." });
        }

        // Verify OTP
        if (otp !== staticOTP) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Store user information in the database
        const newUser = await db.user.create({
            data: {
                name: pendingSignUp.name,
                sms_number: pendingSignUp.sms_number,
                isActive: true // Assuming the user is active by default after signup
            }
        });

        // Remove pending signup after completion
        delete pendingSignUps[sms_number];

        // Return success response
        return res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};


// Function to handle the first step of the login process (sending OTP)
export const login = async (req: Request, res: Response) => {
    const { sms_number } = req.body;

    try {
        // Check if the user with the provided SMS number exists in the database
        const existingUser = await db.user.findUnique({ where: { sms_number } });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found with this mobile number" });
        }

        // Generate OTP and send to the user's SMS number
        await generateOTP(sms_number);
        
        // Send response indicating OTP has been sent
        return res.status(200).json({ message: "OTP has been sent to your mobile number. Please confirm OTP to complete login." });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

// Function to handle the second step of the login process (confirming OTP and logging in)
export const confirmOTPAndLogin = async (req: Request, res: Response) => {
    const { sms_number, otp } = req.body;

    try {
        // Verify OTP
        if (otp !== staticOTP) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Find user by SMS number
        const user = await db.user.findUnique({ where: { sms_number } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // User is authenticated, you can proceed with creating session/token
        // For simplicity, let's just return the user information
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try {
        // Fetch all users from the database
        const users = await db.user.findMany();

        // Return the list of users
        return res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};