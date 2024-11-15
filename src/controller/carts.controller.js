
import {CartsService }from "../services/carts.services.js"

export const getCartByIdController = async (req, res) => {
    try {
        const cartId = req.params.cid

        const cart = await CartsService.getCartById(cartId)

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
        const cart = await CartsService.createCart()

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

       
        const cart = await CartsService.addProduct(cartId, productId);
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

       
        const cart = await CartsService.updateAllProducts(cartId, products);
        
        if (cart) {
            return res.json(cart)
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
}
   



export const updateQuantityProductCartController= async (req, res) => {
    
    async (req, res) => {
    
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            console.log(req.body.quantity)
            const quantity = req.body.quantity?parseInt(req.body.quantity):0;
    
            if(quantity<=0){
                return res.status(400).json({ error: 'La cantidad del producto debe ser un número mayor que 0' });
            }
           
            const cart = await CartsService.updateQuantityProduct(cartId, productId,quantity);
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
   
}

export const deleteAllProductsCartController= async (req, res) => {
    try {
        const cartId = req.params.cid

        const cart = await CartsService.deleteAllProducts(cartId);
        
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

       
        const cart = await CartsService.deleteProduct(cartId, productId);
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