import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

interface CustomRequest extends Request {
  user?: any; // Define the user property
}
dotenv.config();

const userMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.USER_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = {
      id: decoded.id,
    };
    next();
  });
};

export default userMiddleware;
