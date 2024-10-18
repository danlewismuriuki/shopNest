import { Router } from 'express';
import { signUp } from '../controllers/auth'
import authRoutes from './auth';
import productsRoutes from './products';

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes)

export default rootRouter;