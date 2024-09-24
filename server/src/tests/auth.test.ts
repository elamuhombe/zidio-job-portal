//src/tests/auth.test.ts
import { AuthService } from './../services/AuthService'; // Adjust the import as necessary
import { User } from '../models/User';
import { comparePassword, hashPassword } from '../utils';
import { Conflict, HttpError } from '../middleware/Error';
import { UserRole } from '../types';
import jwt from 'jsonwebtoken';


jest.mock('../models/User');
jest.mock('../utils');

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    describe('signUp', () => {
        it('should sign up a user successfully', async () => {
            const payload = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: UserRole.ADMIN
            };

            // Mock implementations
            (User.findOne as jest.Mock).mockResolvedValue(null); // No existing user
            (hashPassword as jest.Mock).mockResolvedValue('hashedPassword'); // Mock hashed password
            (User.prototype.save as jest.Mock).mockResolvedValue({
                _id: 'userId',
                ...payload,
                password: 'hashedPassword'
            });

            const result = await authService.signUp(payload);

            console.log('SignUp Result:', result); // Log the result for debugging

            expect(result).toHaveProperty('message', 'User Created Successfully');
            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('access_token');
            expect(result.user).toMatchObject({
                username: 'testuser',
                email: 'test@example.com',
                role: UserRole.ADMIN // Ensure this matches the payload role
            });
            expect(result.access_token).toBeDefined();
        });

        it('should throw a Conflict error if the user already exists', async () => {
            const payload = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: UserRole.ADMIN
            };

            // Mock existing user
            (User.findOne as jest.Mock).mockResolvedValue({ deletedAt: null });

            try {
                await authService.signUp(payload);
            } catch (error) {
                console.log('Conflict Error:', error); // Log the error for debugging
                expect(error).toBeInstanceOf(Conflict);
            }
        });

        it('should throw an error if the account is deleted', async () => {
            const payload = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: UserRole.EMPLOYER
            };

            // Mock existing user with deleted account
            (User.findOne as jest.Mock).mockResolvedValue({ deletedAt: new Date() });

            try {
                await authService.signUp(payload);
            } catch (error) {
                console.log('HttpError:', error); // Log the error for debugging
                expect(error).toBeInstanceOf(HttpError);
            }
        });
    });

    describe('signIn', () => {
        it('should sign in a user successfully', async () => {
            const payload = {
                email: 'test@example.com',
                password: 'password123'
            };

            const user = {
                _id: 'userId',
                email: 'test@example.com',
                password: 'hashedPassword'
            };

            // Mock implementations
            (User.findOne as jest.Mock).mockResolvedValue(user);
            (comparePassword as jest.Mock).mockResolvedValue(true); // Mock valid password

            // Cast jwt to any to avoid type errors
            jest.spyOn(jwt, 'sign').mockReturnValue('mockAccessToken' as any); // Mock JWT sign

            const result = await authService.signIn(payload);

            console.log('SignIn Result:', result); // Log the result for debugging

            expect(result).toHaveProperty('message', 'Login successful');
            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('access_token', 'mockAccessToken');
            expect(result.user).toMatchObject({
                email: 'test@example.com',
                // Add other properties as necessary
            });
        });

        // ... (Other signIn tests)
    });
});