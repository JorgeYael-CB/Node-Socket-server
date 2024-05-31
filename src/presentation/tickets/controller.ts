import { Request, Response } from "express";


export class TicketController {

    // DI - WssService
    constructor(){};


    getTickets = (req:Request, res:Response) => {
        res.json('GetTickets...');
    };

    getLastTicketNumber = (req:Request, res:Response) => {
        res.json('getLastTicketNumber');
    };

    pendingTickets = (req:Request, res:Response) => {
        res.json('pendingTickets...');
    };

    createTicket = (req:Request, res:Response) => {
        res.json('createTicket...');
    };

    drawTicket = (req:Request, res:Response) => {
        res.json('drawTicket...');
    };

    ticketFinished = (req:Request, res:Response) => {
        res.json('ticketFinished...');
    };

    workingOn = (req:Request, res:Response) => {
        res.json('workingOn...');
    };

};