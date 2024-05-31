import { UuidAdaper } from "../../config";
import { Ticket } from "../../domain/interfaces";



export class TicketService {

    private readonly tickets:Ticket[] = [
        { id: UuidAdaper.v4(), number: 1, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 2, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 3, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 4, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 5, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 6, createAt: new Date(), done: false },
    ];

}