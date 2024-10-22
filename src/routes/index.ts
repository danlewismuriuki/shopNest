import { Router } from 'express';
import { signUp } from '../controllers/auth'
import authRoutes from './auth';
import productsRoutes from './products';
import usersRoutes from './users';
import cartRoutes from './cart';

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes)
rootRouter.use('/users', usersRoutes)
rootRouter.use('/carts', cartRoutes)
rootRouter.use('/order', orderRoutes)
 
export default rootRouter;