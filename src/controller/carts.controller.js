import { cartsService as carts } from "../services/carts.service.js"
import { ticketsServices } from "../services/tickets.service.js";
import { productService } from "../services/products.service.js"
import { UsersService } from "../services/users.services.js";
import {generateId} from "../utils.js" 

export const getCartByIdController = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await carts.getCartByIdProducts(cartId)

        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({ error: 'No se encontró el carrito' });
        }
    } catch (error) {
        console.log(error);
    }
}

export const createCartController = async (req, res) => {
    
    try {
        const cart = await carts.createCart()

        if (cart) {
                  res.json({ status: `Carrito con id: ${cart} correctamente creado` })
        } else {
            res.status(404).json({ error: 'No se logró crear el carrito' });
        }

    } catch (error) {
        console.log(error);
    }
}

export const addProductCartController= async (req, res) => {
    
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

        const cart= await addProduct(cartId, productId);
        if(cart===-1){
            return res.status(400).json({ error: 'El pruducto ingresado no existe' });
        }
        if (cart) {
            return res.json(cart)
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
   
}

export const updateAllProductsCartController= async (req, res) => {
    try {
        const cartId = req.params.cid
        const products = req.body

        const cart = await carts.getCartById(cartId)
        if (cart) {
                const cartUpdated = await carts.updateCartProducts(cartId, { products: products });
                return res.json(cartUpdated)
        }
      
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
}
   



export const updateQuantityProductCartController= async (req, res) => {
    
        try {
            console.log("aca")
            const cartId = req.params.cid
            const productId = req.params.pid
            console.log(req.body)
            const quantity = req.body.quantity?parseInt(req.body.quantity):0;
    
            if(quantity<=0){
                return res.status(400).json({ error: 'La cantidad del producto debe ser un número mayor que 0' });
            }
           
            const cart = await updateQuantityProduct(cartId, productId,quantity);
            if(cart===-1){
                return res.status(400).json({ error: 'El pruducto ingresado no existe' });
            }
            if (cart) {
                return res.json(cart)
             } 
            res.status(404).json({ error: 'No se encontró el carrito' });
            
    
        } catch (error) {
            console.log(error);
        }
       
    
   
}

export const deleteAllProductsCartController= async (req, res) => {
    try {
        const cartId = req.params.cid

        const cart = await carts.updateCartProducts(cartId, { products: [] })
        
        if (cart) {
            return res.json("Todos los productos del carrito fueron eliminados")
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
}


export const deleteProductCartController = async (req, res) => {
    
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

       
        const cart = await deleteProduct(cartId, productId);
        if(cart===-1){
            return res.status(400).json({ error: 'El pruducto ingresado no existe en el carrito' });
        }
        if (cart) {
            return res.json(cart)
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
   
}


export const cartTicketController = async (req, res) => {
    try {
        const cartId = req.params.cid

        const oldCart = await createTicket(cartId)

        if (oldCart) {
            res.json({response: "Productos sin stock", oldCart})
        } else {
            res.status(404).json({ error: 'No se encontró el carrito' });
        }
    } catch (error) {
        console.log(error);
    }
}




//Funciones

const addProduct= async (idCart, idProduct)=> {

    try {
        const cart = await carts.getCartById(idCart)

        if (cart) {
            const validProduct = await productService.getProductById(idProduct)

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


const updateQuantityProduct= async(idCart, idProduct, quantity)=> {

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


const deleteProduct= async(idCart, idProduct)=> {

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

const createTicket= async(idCart) =>{
    try {
        const cart = await carts.getCartById(idCart)
    
        let purchaseDetail=[]
        let oldCart=[]
        let total=0
       
        if (cart) {
            for (var i = 0; i < cart.products.length; i++){
                const item=cart.products[i]
                const product = await productService.getProductById(item.product)
     
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
                  const prueba= await productService.updateProductTicket(product._id, {stock: product.stock-item.quantity})
                  console.log(prueba);
                }else{
                    oldCart.push(item)
                }
            }
             
            const user= await UsersService.getByfiltro({ cart: cart._id })
            console.log( user);
            await carts.updateCartProducts(cart._id, { products: oldCart });

       
            const ticket= await ticketsServices.create({
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





