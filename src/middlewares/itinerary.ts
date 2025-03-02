import { FastifyInstance } from "fastify";
import { OpenAI } from 'openai';

export async function itineraryIA(app: FastifyInstance) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

}


