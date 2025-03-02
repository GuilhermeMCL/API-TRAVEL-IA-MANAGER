import { ItineraryControllers } from "@/controllers/itineraryControllers";
import { itineraryIA } from "@/middlewares/itinerary";
import { FastifyInstance } from "fastify";

const itineraryControllers = new ItineraryControllers();

export async function itineraryRoutes(app: FastifyInstance) {
    await itineraryIA(app)
    app.post("/trips/:id/itinerary", itineraryControllers.createItinerary)

}