import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import compression from 'compression';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  limit: 100,
  handler: (req, res, next) => {
    res.status(429).json({
      message: 'Too many requests, please try again later',
    });
  },
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

import productRouter from './Routes/products.routes.js';

app.use('/api/v1/products', productRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
