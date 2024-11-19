import {ticketDao} from "../dao/tickets.dao.js";

export  class ticketsServices{
    
    static async create(ticket){
        return await ticketDao.create(ticket)
    }
}