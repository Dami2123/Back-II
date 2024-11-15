import mongoose from "mongoose"
export class ConnDB{
    static #connection=null

    static async onConnection(url){
        if(this.#connection){
            console.log(`Conexion previamente establecida`)
            return this.#connection
        }

        this.#connection=await mongoose.connect(url)
        console.log(`DB online...!!!`)
        return this.#connection
    }
}