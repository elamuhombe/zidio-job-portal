//src/services/AuthService.ts
import jwt from "jsonwebtoken";
import config from "../config/index";
import { Conflict, HttpError } from "../middleware/Error";
import { User } from "../models/User";
import { IUserLogin, IUser } from "../types";
import { comparePassword, hashPassword } from "../utils";
import { sendLoginResponse, sendUser } from "../utils/send-response";
import { IUserSignUp } from "../types/types";

export class AuthService {
    public async signUp(payload: IUserSignUp): Promise<{
        message: string;
        user: Partial<IUser>;
        access_token: string;
    }> {
        const { username, email, password, role } = payload;

        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                if (userExists.deletedAt) {
                    throw new HttpError(
                        403,
                        "Account associated with this email has been deleted. Please contact support for assistance."
                    );
                }
                throw new Conflict("User already exists");
            }

            // Hash the password
            const hashedPassword = await hashPassword(password);
            const user = new User({
                username,
                email,
                password: hashedPassword,
                role,
            });

            // Save the user
            const createdUser = await user.save();

            // Generate JWT token
            const access_token = jwt.sign(
                { user_id: createdUser._id },
                config.TOKEN_SECRET,
                { expiresIn: config.TOKEN_EXPIRY }
            );

            // Prepare user response
            const userResponse = sendUser(createdUser);

            return {
                user: userResponse,
                access_token,
                message: "User Created Successfully",
            };
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                throw error;
            } else if (error instanceof Error) {
                throw new HttpError(500, error.message);
            }
            throw new HttpError(500, "An unknown error occurred");
        }
    }

    public async signIn(payload: IUserLogin): Promise<{
        message: string;
        user: Partial<IUser>;
        access_token: string;
    }> {
        const { email, password } = payload;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw new HttpError(401, "Invalid credentials");
            }

            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                throw new HttpError(401, "Invalid credentials");
            }

            const access_token = jwt.sign(
                { user_id: user._id },
                config.TOKEN_SECRET,
                { expiresIn: config.TOKEN_EXPIRY }
            );

            const userResponse = sendLoginResponse(user);

            return {
                user: userResponse,
                access_token,
                message: "Login successful",
            };
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                throw error;
            } else if (error instanceof Error) {
                throw new HttpError(500, error.message);
            }
            throw new HttpError(500, "An unknown error occurred");
        }
    }
}
