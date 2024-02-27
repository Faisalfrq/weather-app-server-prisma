import { Request, Response } from 'express';
import { db } from "../../lib/db";

// Simulated OTP for testing
const staticOTP = "123456"; // Static 6-digit OTP for testing

// Map to store pending signups awaiting OTP confirmation
const pendingSignUps: Record<string, { sms_number: string }> = {};

// Function to simulate OTP generation and sending
const generateOTP = async (contact: string) => {
    // In a real scenario, you'd generate a random OTP and send it via SMS or email
    // For testing purposes, we'll use a static OTP
    console.log(`OTP generated and sent to ${contact}: ${staticOTP}`);
};

// Function to handle user sign-up request
export const signUp = async (req: Request, res: Response) => {
    const { sms_number } = req.body;

    try {
        await generateOTP(sms_number);
        // Check if the provided SMS number already exists in the database
        const existingUser = await db.user.findUnique({ where: { sms_number } });
        if (existingUser) {
            return res.status(400).json({ message: "You already have an account, confirm otp and continue" });
        }

        // Store user information temporarily until OTP confirmation
        pendingSignUps[sms_number] = { sms_number };

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
            // If no pending signup found, confirm OTP and show message login successful
            if (otp === staticOTP) {
                return res.status(200).json({ message: "Login successful" });
            } else {
                return res.status(400).json({ message: "Invalid OTP" });
            }
        }

        // Verify OTP
        if (otp !== staticOTP) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Store user information in the database
        const newUser = await db.user.create({
            data: {
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



export const getUserById = async (req: Request, res: Response) => {
    try {
        let id = "clt43m2l80000byfczmzptzu7"
        // Fetch all users from the database
        const users = await db.user.findUnique({where:{id},include:{Subscriptions:true} });

        // Return the list of users
        return res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};