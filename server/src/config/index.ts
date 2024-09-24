import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  API_KEY?: string;
  NODE_ENV?: string;
  MONGODB_URI?: string;
  BASE_URL?: string;
  apiPrefix: string;
  TOKEN_SECRET: string; // Make this required
  TOKEN_EXPIRY?: string;
  SWAGGER_JSON_URL?: string;
  MEGA_EMAIL?: string;
  MEGA_PASSWORD?: string;
  MEGA_FOLDER?: string;
}

// Ensure TOKEN_SECRET is defined before creating the config object
if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not defined");
}

const config: Config = {
  port: parseInt(process.env.PORT || '7100', 10),
  API_KEY: process.env.API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  BASE_URL: process.env.BASE_URL,
  apiPrefix: "api/v1",
  TOKEN_SECRET: process.env.AUTH_SECRET,
  TOKEN_EXPIRY: process.env.AUTH_EXPIRY,
  SWAGGER_JSON_URL: process.env.SWAGGER_JSON_URL,
  MEGA_EMAIL: process.env.MEGA_EMAIL,
  MEGA_PASSWORD: process.env.MEGA_PASSWORD,
  MEGA_FOLDER: process.env.MEGA_FOLDER,
};

export default config;
