//src/Server.ts
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 7100; // Use the PORT variable from .env, or default to 5000

app.get('/', (req, res) => {
  res.send('Welcome to Zidio back-end!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
