//src/middleware/Auth.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "./../models/User";
import log from "../utils/logger";
import { JwtPayload, UserRole } from "../types";
import {ServerError} from "./Error";

export const authMiddleware = async (
  req: Request & { user?: { user_id: string; role: UserRole; email: string; username: string } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status_code: "401",
        message: "Invalid token",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status_code: "401",
        message: "Invalid token",
      });
    }

    if (!config.TOKEN_SECRET) {
      return res.status(500).json({
        status_code: "500",
        message: "Server error: TOKEN_SECRET is not defined",
      });
    }

    jwt.verify(token, config.TOKEN_SECRET, async (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
      }

      const { user_id } = decoded as JwtPayload;
      log.info(`User with ID ${user_id} is logged in`);

      const user = await User.findOne({ _id: user_id });

      if (!user) {
        return res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
      }

      req.user = {
        user_id: user._id.toString(),
        role: user.role,
        email: user.email,
        username: user.username,
      };

      next();
    });
  } catch (error) {
    log.error(error);
    throw new ServerError("INTERNAL_SERVER_ERROR");
  }
};
