//src/utils/index.ts
import * as bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import config from "../config";
import { Request, Response } from 'express';

export const getIsInvalidMessage = (fieldLabel: string) =>
  `${fieldLabel} is invalid`;

export const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    keyGenerator: (req: Request, res: Response) => {
      // Ensure it always returns a string
      return req.ip || 'default-key'; // Fallback to a default string if req.ip is undefined
    },
  });

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const verifyToken = (token: string): Record<string, unknown> | null => {
    if (!config.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET is not defined in the configuration');
    }
  
    try {
      const payload = jwt.verify(token, config.TOKEN_SECRET) as Record<string, unknown>;
      return payload; // Return the payload directly
    } catch (error) {
      console.error('Token verification error:', error); // Log the error for debugging
      return null; // Return null for a failed verification
    }
  };
  

export const generateNumericOTP = (length: number): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 9 + 1).toString();
  }
  return otp;
};