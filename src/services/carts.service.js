import {CartsDao} from "../dao/carts.dao.js";

class CartsService{
    constructor(dao){
        this.dao=dao
    }

        
    async getCartByIdProducts(id){
        return await this.dao.getCartByIdProducts(id)
    }
    async getCartById(id){
        return await this.dao.getCartById(id)
    }
    
    async createCart(){
        return await this.dao.createCart({products: []})
    }

    async updateCartProducts(idCart, updProducts) {
        return await this.dao.updateCartProducts(idCart, updProducts )
    }
}

export const cartsService=new CartsService(CartsDao)
