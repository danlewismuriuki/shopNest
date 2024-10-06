import { Router } from 'express';
import { login } from '../controllers/auth'

const rootRouter: Router = Router()

rootRouter.use('/auth', login)

export default rootRouter;