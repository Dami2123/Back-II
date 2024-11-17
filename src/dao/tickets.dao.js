import ticketModel from "./models/ticket.model.js";

export  class ticketDao{
    
    static async create(ticket){
        return await ticketModel.create(ticket)
    }
}