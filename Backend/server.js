import dotenv from 'dotenv';
dotenv.config();
import { ConnectDB } from './DB/index.js';
import { getProductsAndSaveToDb } from './Controllers/products.controller.js';

const PORT = process.env.PORT || 3000;

import app from './app.js';

ConnectDB();

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server is running on port ${PORT}`);

  getProductsAndSaveToDb();
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received');
  server.close(() => process.exit(0));
});

process.on('exit', () => {
  console.log('Process is exiting');
});
