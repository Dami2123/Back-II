import { ProductsDao } from "../dao/products.dao.js";
import {CartsDao as carts} from "../dao/carts.dao.js";
import { ticketDao } from "../dao/tickets.dao.js";
import {generateId} from "../utils.js"
import { UsersService } from "./users.services.js";

export class ticketsServices{
    static async createTicket(idCart) {
        try {
            const cart = await carts.getCartById(idCart)
        
            let purchaseDetail=[]
            let oldCart=[]
            let total=0

            if (cart) {

                for (var i = 0; i < cart.products.length; i++){
                   const item=cart.products[i]
                    const product = await ProductsDao.getProductById(item.product)
         
                    console.log(product.stock );
                    if (product.stock >= item.quantity) {
                        const totalProduct = item.quantity * product.price
                        total += totalProduct
                        purchaseDetail.push({
                            code: product.code,
                            title: product.title,
                            price: product.price,
                            quanity: item.quantity,
                            total_product: totalProduct
                        })
                        await ProductsDao.updateProduct(product._id, {stock: product.stock-item.quantity})
                    }else{
                        oldCart.push(item)
                    }

                 }
            
                const user= await UsersService.getByfiltro({ cart: cart._id })
                
                await carts.updateCartProducts(cart._id, { products: oldCart });

           
                const ticket= await ticketDao.create({
                    code: generateId(),
                    date: new Date(),
                    purchaser: user.email,
                    amount: total,
                    purchase_detail: purchaseDetail
                })
                
                return oldCart
            }

            return null
        } catch (error) {
            return null
        }
    }

}