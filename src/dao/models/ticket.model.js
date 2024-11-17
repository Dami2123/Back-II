import mongoose from "mongoose";

const collection = 'tickets';

const schema = new mongoose.Schema((
    {
        code: String, 
        date: Date, 
        purchaser: String,
        amount: Number, 
        purchase_detail:{
            type:[]
        }
    }
))

const ticketModel = mongoose.model(collection,schema);

export default ticketModel;

