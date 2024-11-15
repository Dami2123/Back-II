import cartModel from './models/carts.model.js';


export default class CartsDao {

    static async getCartById(id) {
        return await cartModel.findById(id).lean().populate("products.product")
    }

    static async createCart(cart) {
        return await cartModel.create(cart);
    }

    static async updateCartProducts(idCart, updProducts={}) {
        return await cartModel.findByIdAndUpdate(idCart, { $set: { updProducts} });
    }


}