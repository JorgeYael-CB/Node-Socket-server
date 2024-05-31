import { Router } from "express";
import { TicketController } from "./controller";
import { TicketService } from '../services/ticket.service';
import { WssService } from "../services/wss.service";



export class TicketRoutes {

    static get routes():Router{
        const routes = Router();
        const ticketController = new TicketController();


        routes.get('/', ticketController.getTickets);
        routes.get('/last', ticketController.getLastTicketNumber);
        routes.get('/pending', ticketController.pendingTickets);

        routes.post('/', ticketController.createTicket);

        routes.get('/draw/:desk', ticketController.drawTicket);
        routes.put('/done/:ticketId', ticketController.ticketFinished);

        routes.get('/working-on', ticketController.workingOn);

        return routes;
    };

};