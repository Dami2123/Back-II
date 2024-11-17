import { Router } from 'express'
import { auth } from '../middleware/auth.js';
import { passportCall } from '../utils.js';
import {getAllProductsController, getProductByIdController, addProductController, updateProductController, deletedProductController} from "../controller/products.controller.js"

const router = Router();

router.get('/', getAllProductsController)

router.get('/:pid', getProductByIdController)


router.post('/',passportCall("current"), auth("admin"), addProductController)


router.put('/:pid',passportCall("current"), auth("admin"), updateProductController)


router.delete('/:pid', passportCall("current"), auth("admin"), deletedProductController)



export default router;