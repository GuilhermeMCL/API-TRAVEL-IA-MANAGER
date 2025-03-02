
import { app } from "../app";
import { UserControllers } from "../controllers/users-controllers";
import { FastifyInstance } from 'fastify';


const usersController = new UserControllers();

export async function authRoutes(app: FastifyInstance) {
    app.post(
        "/register",
        {
            schema: {
                description: "Cria um novo usuário",
                tags: ["users"],
                body: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6, },
                    },
                },
                response: {
                    200: {
                        description: "Usuário registrado com sucesso",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                            user: {
                                type: "object",
                                properties: {
                                    id: { type: "string", format: "uuid" },
                                    name: { type: "string", example: "John Doe" },
                                    email: { type: "string", format: "email" },
                                },
                            },
                        },
                    },
                },
            },
        },
        usersController.createUser
    );

    app.post(
        "/login",
        {
            schema: {
                description: "Login de usuário",
                tags: ["users"],
                body: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6 },
                    },
                },
                response: {
                    200: {
                        description: "Usuário autenticado com sucesso",
                        type: "object",
                        properties: {
                            token: { type: "string" },
                        },
                    },
                },
            },
        },
        usersController.login
    );
}
