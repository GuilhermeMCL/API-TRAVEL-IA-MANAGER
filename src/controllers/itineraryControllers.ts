import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "jsonwebtoken";
import z from "zod";


export class ItineraryControllers {
    async createItinerary(request: FastifyRequest, reply: FastifyReply) {
        const parmsSchema = z.object({
            id: z.string()
        })

        const { id } = parmsSchema.parse(request.params)


        const trip = await prisma.trip.findUnique({
            where: {
                id
            }
        })

        return console.log(trip)


    }

}