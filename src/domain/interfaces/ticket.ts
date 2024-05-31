export interface Ticket {

    id: string;
    number: number;
    createAt: Date;
    handleAtDesk?:string; // escritorio 1
    handleAt?: Date;
    done: boolean;

};