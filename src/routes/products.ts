import { Router } from 'express'
import { errorHandler } from '../error-handler';
import { createProduct, updateProduct, deleteProduct, listProducts, getProductById} from '../controllers/products';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const productsRoutes:Router = Router()
// Product routes 
productsRoutes.post('/',[authMiddleware, adminMiddleware], errorHandler(createProduct))
productsRoutes.put('/:id',[authMiddleware, adminMiddleware], errorHandler(updateProduct))
productsRoutes.delete('/:id',[authMiddleware, adminMiddleware], errorHandler(deleteProduct))
productsRoutes.get('/',[authMiddleware, adminMiddleware], errorHandler(listProducts))
productsRoutes.get('/:id',[authMiddleware, adminMiddleware], errorHandler(getProductById))

export default productsRoutes;
