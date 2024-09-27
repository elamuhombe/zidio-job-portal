//src/services/UserService.ts

import {User} from '../models/User'; // Adjust the path according to your project structure
import { IUser } from '../types/index'; // Import User type for TypeScript (if you have a defined interface)

// Service class for user-related operations
class UserService {
  // Method to get all users
  async getAllUsers(): Promise<IUser[]> {
    try {
      return await User.find().select('-password'); // Exclude the password from the returned data
    } catch (error) {
      throw new Error('Error fetching users');{}
    }
  }

  // Method to get a user by ID
  async getUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id).select('-password'); // Exclude the password
    } catch (error) {
      throw new Error('Error fetching user by ID');
    }
  }

  // You can add more methods here (e.g., createUser, updateUser, deleteUser, etc.)
}

export default new UserService();
