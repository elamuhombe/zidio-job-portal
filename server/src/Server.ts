//src/Server.ts
import express from 'express';
import dotenv from 'dotenv';
import { swaggerDocs, swaggerUi } from './config/Swagger'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7100;

// Set up Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Zidio back-end!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
