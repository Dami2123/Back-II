import cartModel from './models/carts.model.js';


export  class CartsDao {

    static async getCartByIdProducts(id) {
        return await cartModel.findById(id).lean().populate("products.product")
    }

    static async getCartById(id) {
        return await cartModel.findById(id)
    }

    static async create(cart) {
        return await cartModel.create(cart);
    }

    static async updateCartProducts(idCart, updProducts) {
        return await cartModel.findByIdAndUpdate(idCart, { $set: updProducts });
    }

    
}