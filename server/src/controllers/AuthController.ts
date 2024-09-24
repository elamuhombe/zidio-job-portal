//src/controllers/AuthController.ts
import { Request, Response, NextFunction } from "express";
import  { AuthService}  from "../services/AuthService";
import { sendJsonResponse } from "../utils/send-response";

const AuthServices: any = new AuthService();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, access_token, message } = await AuthServices.signUp(req.body);
    sendJsonResponse(res, 201, message, { user, access_token });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, access_token, message } = await AuthServices.signIn(req.body);
    sendJsonResponse(res, 201, message, { user, access_token });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
