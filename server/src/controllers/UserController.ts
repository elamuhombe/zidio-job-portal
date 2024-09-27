//src/controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/UserService'; // Import UserService
import { IUser } from '../types/index'; // Import IUser type

// Controller class for user-related endpoints
class UserController {
  // Method to get all users
  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users: IUser[] = await UserService.getAllUsers(); // Use UserService to fetch users
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }

  // Method to get a single user by ID
  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user: IUser | null = await UserService.getUserById(id); // Use UserService to fetch user
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }

  // Additional methods for user-related operations (e.g., createUser, updateUser, deleteUser) can be added here
}

export default new UserController();
