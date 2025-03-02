import { FastifyInstance } from "fastify";
import { OpenAI } from "openai";

export async function tripsRoutes(app: FastifyInstance) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

}