//src/controllers/AuthController.ts
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { sendJsonResponse } from "../utils/send-response";
import { signUpSchema, signInSchema } from "../validators/AuthValidator"; // Import validation schemas

const authService = new AuthService();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the signup request body
    const validatedData = signUpSchema.parse(req.body);
    
    const { user, access_token, message } = await authService.signUp(validatedData);
    sendJsonResponse(res, 201, message, { user, access_token });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the signin request body
    const validatedData = signInSchema.parse(req.body);

    const { user, access_token, message } = await authService.signIn(validatedData);
    sendJsonResponse(res, 200, message, { user, access_token }); // Changed status code to 200 for successful login
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
