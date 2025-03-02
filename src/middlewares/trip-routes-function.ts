import { FastifyInstance } from "fastify";

export async function tripsFunction(app: FastifyInstance) {
    app.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.code(401).send({ message: 'nao autenticado |Unauthorized' })
        }
    }
    );
}