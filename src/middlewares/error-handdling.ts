import { FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../utils/app-error';

export const errorHandler = (error: Error | AppError, request: FastifyRequest, reply: FastifyReply) => {
    const statusCode = (error instanceof AppError) ? error.statuscode : 500;
    reply.status(statusCode).send({
        status: 'error',
        message: error.message,
    });
};