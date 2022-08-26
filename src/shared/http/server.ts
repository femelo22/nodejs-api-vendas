import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors()); //liberar cors
app.use(express.json()); //usar json

app.use(routes); // deixar rodas nossas rotas disponiveis

//capturar excessoes do nosso sistema (middleware)
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Erro não identificado pelo sistema.',
    });
  },
);

app.listen(3000, () => {
  console.log('Server is running on port 3000! 🚀');
});
