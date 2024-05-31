import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";



export class TicketController {

    // DI - WssService
    constructor(
        private readonly ticketService = new TicketService(),
    ){};


    getTickets = (req:Request, res:Response) => {
        res.json(this.ticketService.tickets);
    };

    getLastTicketNumber = (req:Request, res:Response) => {
        res.json(this.ticketService.lastTicketNumber);
    };

    pendingTickets = (req:Request, res:Response) => {
        res.json(this.ticketService.pendingTickets);
    };

    createTicket = (req:Request, res:Response) => {
        res.status(201).json(this.ticketService.createTicket());
    };

    drawTicket = (req:Request, res:Response) => {
        const { desk } = req.params;

        res.json(this.ticketService.drawTicket(desk));
    };

    ticketFinished = (req:Request, res:Response) => {
        const { ticketId } = req.params;

        res.json( this.ticketService.onTicketFinished(ticketId) );
    };

    workingOn = (req:Request, res:Response) => {
        res.json( this.ticketService.lastWorkingOnTickets );
    };

};