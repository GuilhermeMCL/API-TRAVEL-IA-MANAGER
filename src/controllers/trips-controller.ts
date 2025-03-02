
import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { start } from "repl";

import z from "zod";



interface JwtPayload {
    id: string;
    name: string;
    email: string;
}

export class TripsControllers {
    async createTrips(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            name: z.string(),
            city: z.string(),
            startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format | Formato de data inválido"),
            endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format | Formato de data inválido"),
        });

        const user = request.user as JwtPayload;
        const userId = parseInt(user.id, 10);
        const { name, city, startDate, endDate } = bodySchema.parse(request.body);

        const startDatenew = new Date(`${startDate}T00:00:00.000Z`);
        const endDatenew = new Date(`${endDate}T00:00:00.000Z`);

        try {


            if (startDatenew > endDatenew) {
                return reply.status(400).send({ message: "Start date must be before end date" });
            }

            const tripname = await prisma.trip.findFirst({
                where: {
                    name,
                    userId: userId,
                },
            });

            if (tripname) {
                return reply.status(400).send({ message: "Trip name already exists" });
            }

            const trip = await prisma.trip.create({
                data: {
                    name,
                    city,
                    startDate: startDatenew,
                    endDate: endDatenew,
                    userId: userId,
                },
            });

            return reply.status(201).send({ message: "Trip created", trip });
        } catch (error) {
            return reply.status(400).send({ message: "Invalid request", error });
        }
    }

    async getTrips(request: FastifyRequest, reply: FastifyReply) {
        const user = request.user as JwtPayload;
        const userId = parseInt(user.id, 10);
        const trips = await prisma.trip.findMany({
            where: {
                userId: userId,
            },
        });
        return reply.send({ trips }.trips);
    }





}