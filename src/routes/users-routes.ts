
import { app } from "../app";
import { UserControllers } from "../controllers/users-controllers";
import { FastifyInstance } from 'fastify';


const usersController = new UserControllers();

export async function authRoutes(app: FastifyInstance) {
    app.post("/register", usersController.createUser)
    app.post("/login", usersController.login)
}

