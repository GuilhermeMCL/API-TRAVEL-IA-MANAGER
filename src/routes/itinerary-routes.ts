import { ItineraryControllers } from "@/controllers/itineraryControllers";
import { FastifyInstance } from "fastify";

const itineraryControllers = new ItineraryControllers();

export async function itineraryRoutes(app: FastifyInstance) {
    app.post("/trips/:id/itinerary", itineraryControllers.createItinerary)

}