import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import OpenAI from "openai";
import z from "zod";


export class ItineraryControllers {
    async createItinerary(request: FastifyRequest, reply: FastifyReply) {
        const openai = new OpenAI({
            apiKey: env.OPENAI_API_KEY
        });
        const parmsSchema = z.object({
            id: z.string()
        })

        const { id } = parmsSchema.parse(request.params)


        const trip = await prisma.trip.findUnique({
            where: {
                id
            }
        })


        if (!trip) {
            return reply.status(404).send({ message: "Viagem nao encontrada | Trip not found" })
        }



        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system", content: "voce é um assistente profissional de viagens que cria roteiros detalhados "
                    },
                    {
                        role: "user", content: `crie um roteiro detalhado de viagem com pontos turisticos e atividades recomendadas para ${trip.city} entre ${trip.startDate} e ${trip.endDate}, coloque os custo de gasto medio das atividades e alimentação`
                    }
                ]
            })
            const itinerary = response.choices[0].message.content || "Roteiro nao criado | Itinerary not created"

            const updateTrip = await prisma.trip.update({
                where: {
                    id
                },
                data: {
                    itinerary
                }
            })

            return reply.send({ updateTrip }.updateTrip).code(201)


        } catch (error) {
            return reply.status(500).send({ message: "Erro ao criar roteiro | Error creating itinerary" })
        }


    }
}

