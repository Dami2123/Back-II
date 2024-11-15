import {CartsDao as carts} from "../dao/carts.dao.js";
import { ProductsDao } from "../dao/products.dao.js";



export default class CartsService {


    static async getCartById(id) {
        try {
            return await carts.getCartById(id)
        } catch (error) {
            return null
        }
    }



    static async createCart() {
        const newCart = {
            products: []
        }
        try {
            const cart = await carts.create(newCart);
            return cart._id
        }
        catch (error) {
            console.log(error)

        }
    }

    static async addProduct(idCart, idProduct) {

        try {
            const cart = await carts.getCartById(idCart)

            if (cart) {
                const validProduct = await ProductsDao.getProductById(idProduct)

                if (validProduct) {

                    const existingProduct = cart.products.findIndex((element) => element.product == idProduct);

                    if (existingProduct === -1) {
                        cart.products.push({ product: idProduct, quantity: 1 })

                    } else {
                        cart.products[existingProduct].quantity += 1;
                    }

                    const cartUpdated = await carts.updateCartProducts(idCart, { products: cart.products });
                    return cartUpdated

                }
                return -1
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }


    static async updateAllProducts(idCart, products) {

        try {
            const cart = await carts.getCartById(idCart)
            if (cart) {
                    const cartUpdated = await carts.updateCartProducts(idCart, { products: products });
                    return cartUpdated
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }


    static async updateQuantityProduct(idCart, idProduct, quantity) {

        try {
            const cart = await carts.getCartById(idCart)

            if (cart) {
                const existingProduct = cart.products.findIndex((element) => element.product == idProduct);

                if (existingProduct != -1) {

                    cart.products[existingProduct].quantity =  quantity;

                    const cartUpdated = await carts.updateCartProducts(idCart, { products: cart.products });
                    return cartUpdated

                }
                return -1
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }

    static async deleteAllProducts(idCart) {

        try {
            const cart = await carts.updateCartProducts(idCart, { products: [] });

                return true
            
        } catch (error) {
            console.log(error);
        }


    }

    static async deleteProduct(idCart, idProduct) {

        try {
            const cart = await carts.getCartById(idCart)

            if (cart) {
             
              const existingProduct = cart.products.findIndex((element) => element.product == idProduct);

              
                if (existingProduct === -1) {
                    return existingProduct

                }  
                cart.products.splice(existingProduct,1)
                    

                const cartUpdated = await carts.updateCartProducts(idCart, { products: cart.products });
                return cartUpdated

                
              
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }



}