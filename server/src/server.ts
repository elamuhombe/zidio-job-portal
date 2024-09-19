import express, { Application } from 'express';

const app: Application = express();
const PORT = 7200;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
