import { TripsControllers } from "@/controllers/trips-controller";
import { tripsFunction } from "@/middlewares/trip-routes-function";
import { FastifyInstance } from 'fastify'; // Adjust the import path as necessary

const tripsControllers = new TripsControllers();


export async function tripsRoutes(app: FastifyInstance) {
    await tripsFunction(app);
    app.post("/trips", {
        schema: {
            tags: ["trips"],
            body: {
                type: "object",
                required: ["name", "description", "city", "startDate", "endDate"],
                properties: {
                    name: { type: "string" },
                    city: { type: "string" },
                    startDate: { type: "string" },
                    endDate: { type: "string" },
                    description: { type: "string" },
                },
            },
            response: {
                200: {
                    type: "object",
                    tags: ["trips"],
                    properties: {
                        message: { type: "string" },
                        trip: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                name: { type: "string" },
                                city: { type: "string" },
                                startDate: { type: "string" },
                                endDate: { type: "string" },
                                description: { type: "string" },
                            },
                        },
                    },
                },
                400: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        }
    }, tripsControllers.createTrips)
    app.get("/trips", {
        schema: {
            tags: ["trips"],
            response: {
                200: {
                    type: "object",
                    tags: ["trips"],
                    properties: {
                        message: { type: "string" },
                        trip: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                name: { type: "string" },
                                city: { type: "string" },
                                startDate: { type: "string" },
                                endDate: { type: "string" },
                                description: { type: "string" },
                            },
                        },
                    },
                },
            }
        }
    }, tripsControllers.getTrips)

}
