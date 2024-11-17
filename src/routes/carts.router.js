import { Router } from 'express'
import {cartTicketController, getCartByIdController, createCartController, addProductCartController, updateAllProductsCartController, updateQuantityProductCartController, deleteAllProductsCartController, deleteProductCartController} from '../controller/carts.controller.js';
import { passportCall } from '../utils.js';
import { auth } from '../middleware/auth.js';


const router = Router();

router.get('/:cid', passportCall("current"),auth(), getCartByIdController)

router.post('/', createCartController)


router.post('/:cid/product/:pid', passportCall("current"),auth(), addProductCartController)


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

router.put('/:cid', passportCall("current"),auth(),updateAllProductsCartController)


//en el body se recibe exclusivamente el número que indica para actualizar la cantidad del  prducto indicado
router.put('/:cid/product/:pid', passportCall("current"),auth(), updateQuantityProductCartController)


router.delete('/:cid', passportCall("current"),auth(), deleteAllProductsCartController)

router.delete('/:cid/product/:pid',passportCall("current"),auth(), deleteProductCartController)

router.post('/:cid/purchase', passportCall("current"),auth(), cartTicketController)


export default router;

