import {CartsDao} from "../dao/carts.dao.js";

class CartsService{
    constructor(dao){
        this.dao=dao
    }

    async getCartById(id){
        return await this.dao.findById(id)
    }
    
    async createCart(){
        return await this.dao.create({products: []})
    }

    async updateCartProducts(idCart, updProducts) {
        return await this.dao.findByIdAndUpdate(idCart, { $set: { updProducts} })
    }
}

export const cartsService=new CartsService(CartsDao)
