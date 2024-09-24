//src/routes/AuthRoute.ts
import { Router } from "express";
import { signUp, signIn } from "../controllers/AuthController";
import { validateData } from "../middleware/ValidationMiddleware";
import { signInSchema, signUpSchema } from "../validators/AuthValidator";

const authRoute = Router();

authRoute.post("/auth/signUp", validateData(signUpSchema), signUp);
authRoute.post("/auth/signIn", validateData(signInSchema), signIn);

export { authRoute };