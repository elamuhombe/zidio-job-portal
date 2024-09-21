// src/components/types/RegisterFormTypes.ts

export interface RegisterFormProps {
    userData: {
      name: string;
      email: string;
      password: string;
      username: string;
      role: 'job_seeker' | 'employer';
    };
    handleInputChange: (field: string, value: string) => void;
    handleRegister: (e: React.FormEvent) => Promise<void>;
  }
  