import { Router } from 'express'
import {getAllProductsController, getProductByIdController, addProductController, updateProductController, deletedProductController} from "../controller/products.controller.js"

const router = Router();

router.get('/', getAllProductsController)

router.get('/:pid', getProductByIdController)


router.post('/', addProductController)


router.put('/:pid', updateProductController)


router.delete('/:pid', deletedProductController)



export default router;