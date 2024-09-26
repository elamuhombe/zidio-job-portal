import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { swaggerDocs, swaggerUi } from './config/Swagger'; 
import { errorHandler, routeNotFound } from './middleware/Error';
import { authRoute } from './routes/AuthRoute';
import jobRoute from './routes/JobRoute';
import { insertSeedData } from './SeedData';
import { userRoute } from './routes/userRoute';
import jobApplicationRoute from './routes/JobApplicationRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not set

app.options("*", cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI!);
    console.log('MongoDB connected successfully');

    // Insert seed data after the connection is established
    await insertSeedData(); // Call the function to insert seed data
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

connectToMongoDB();

// Set up Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Zidio back-end!');
});
app.get("/api/v1", (req,res) => {
  res.json({ message: "I am the express API responding for Job Listing Platform" });
});

app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", jobRoute)
app.use("/api/v1", jobApplicationRoute)


app.use(errorHandler);
app.use(routeNotFound);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
