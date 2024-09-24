//src/types/types.ts
export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    JOB_SEEKER = 'job_seeker',
    EMPLOYER = 'employer'
  }
  
  export interface IUserSignUp {
    username: string;
    email: string;
    password: string;
    role: UserRole;
  }
  