import { UuidAdaper } from "../../config";
import { Ticket } from "../../domain/interfaces";
import { WssService } from "./wss.service";


export class TicketService {

    constructor(
        private readonly wssService = WssService.instance,
    ){};

    private readonly workingOnTickets:Ticket[] = [];
    public readonly tickets:Ticket[] = [
        { id: UuidAdaper.v4(), number: 1, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 2, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 3, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 4, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 5, createAt: new Date(), done: false },
        { id: UuidAdaper.v4(), number: 6, createAt: new Date(), done: false },
    ];


    public get pendingTickets():Ticket[] {
        return this.tickets.filter( ticket => !ticket.handleAtDesk );
    };

    public get lastWorkingOnTickets():Ticket[] {
        return this.workingOnTickets.slice(0, 4);
    };


    public get lastTicketNumber(){
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
    };


    public createTicket() {
        const newTicket:Ticket = {
            createAt: new Date(),
            id: UuidAdaper.v4(),
            number: this.lastTicketNumber + 1,
            done: false,
        };

        this.tickets.push( newTicket );
        this.onTicketNumberChanged();

        return newTicket;
    };


    public drawTicket( desk:string ) {
        const ticket = this.tickets.find( t => !t.handleAtDesk );
        if( !ticket ) return {status: 'error', message: 'No hay tickets pendientes'};

        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();

        this.workingOnTickets.unshift({...ticket});

        // TODO: ws
        this.onTicketNumberChanged();

        return {
            status: 'ok',
            message: 'Ticket en cola',
            ticket,
        }
    };


    public onTicketFinished( id:string ) {
        const ticket = this.tickets.find( t => t.id === id );
        if( !ticket ) return {status: 'error', message: 'Ticket no encontrado'};

        this.tickets.map( t => {
            if( t.id === id ){
                t.done = true;
            };

            return t
        })

        return {status: 'ok', message: `ticket finished with id: ${id}`};
    };


    private onTicketNumberChanged() {
        this.wssService.sendMessage('on-ticket-count-changed', this.tickets.length);
    };
}