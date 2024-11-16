import mongoose from "mongoose";

const collection = 'tickets';

const schema = new mongoose.Schema((
    {
        nroComp: String, 
        fecha: Date, 
        email_comprador: String,
        total: Number, 
        detalle:{
            type:[]
        }
    },
    {timestamps:true}
))

const ticketModel = mongoose.model(collection,schema);

export default ticketModel;

