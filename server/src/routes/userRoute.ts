// src/routes/UserRoute.ts
import { Router } from "express";
import UserController from "../controllers/UserController"; // Import UserController

const userRoute = Router();

// Route to get all users
userRoute.get("/users", UserController.getUsers);

// Route to get a user by ID
userRoute.get("/users/:id", UserController.getUserById);

export { userRoute };
