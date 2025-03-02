import { TripsControllers } from "@/controllers/trips-controller";
import { tripsFunction } from "@/middlewares/trip-routes-function";
import { FastifyInstance } from 'fastify'; // Adjust the import path as necessary

const tripsControllers = new TripsControllers();


export async function tripsRoutes(app: FastifyInstance) {
    await tripsFunction(app);
    app.post("/trips", tripsControllers.createTrips)
    app.get("/trips", tripsControllers.getTrips)

}
