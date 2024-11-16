import { Router } from 'express'
import {getCartByIdController, createCartController, addProductCartController, updateAllProductsCartController, updateQuantityProductCartController, deleteAllProductsCartController, deleteProductCartController} from '../controller/carts.controller.js';



const router = Router();

router.get('/:cid', getCartByIdController)


router.post('/', createCartController)


router.post('/:cid/product/:pid', addProductCartController)


/* El body recibe un arreglo con el siguiente formato
         [
             {
             "product": "66e4b04191008e5d236762ea",
             "quantity": 1
             },
             {
              "product": "66e4b04191008e5d236762ce",
              "quantity": 1
             }
        ]
*/


router.put('/:cid', updateAllProductsCartController)


//en el body se recibe exclusivamente el número que indica para actualizar la cantidad del  prducto indicado
router.put('/:cid/product/:pid', updateQuantityProductCartController)


router.delete('/:cid', deleteAllProductsCartController)



router.delete('/:cid/product/:pid', deleteProductCartController)


export default router;

