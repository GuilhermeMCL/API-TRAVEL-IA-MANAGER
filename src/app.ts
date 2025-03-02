
import fastify from 'fastify'
import { errorHandler } from './middlewares/error-handdling';
import { authRoutes } from './routes/users-routes';
import fastifyJwt from 'fastify-jwt';
import { env } from './env';
import { tripsRoutes } from './routes/trips-routes';
import { itineraryRoutes } from './routes/itinerary-routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
export const app = fastify()



app.register(fastifySwagger, {
    swagger: {
        info: {
            title: "API de Gestão de Eventos",
            description: "Documentação da API",
            version: "1.0.0",
        },
        tags: [{ name: "users", description: "Rotas de usuários" }, { name: "trips", description: "Rotas de viagens" }, { name: "itinerary", description: "Rotas de roteiros", }]
    },
});

// Registrar a UI do Swagger
app.register(fastifySwaggerUi, {
    routePrefix: "/docs", // Acessível em http://localhost:3000/docs
});


app.setErrorHandler(errorHandler);
app.register(fastifyJwt, { secret: env.JWT_SECRET as string });
app.register(authRoutes);
app.register(tripsRoutes);
app.register(itineraryRoutes);











