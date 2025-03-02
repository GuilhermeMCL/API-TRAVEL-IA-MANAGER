
import fastify from 'fastify'
import { errorHandler } from './middlewares/error-handdling';
import { authRoutes } from './routes/users-routes';
import fastifyJwt from 'fastify-jwt';
import { env } from './env';
import { tripsRoutes } from './routes/trips-routes';
export const app = fastify()

app.setErrorHandler(errorHandler);
app.register(fastifyJwt, { secret: env.JWT_SECRET as string });
app.register(authRoutes);
app.register(tripsRoutes)





