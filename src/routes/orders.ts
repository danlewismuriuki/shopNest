import { Router } from 'express'
import { errorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin'
import { cancelOrder, createOrder, getOrderById, listOrders, listAllOrders, listUserOrders, changeStatus } from '../controllers/orders'

const orderRoutes:Router = Router()

orderRoutes.post('/', [authMiddleware], errorHandler(createOrder))
orderRoutes.get('/', [authMiddleware], errorHandler(listOrders))
orderRoutes.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder))
orderRoutes.get('/:id', [authMiddleware], errorHandler(getOrderById))


orderRoutes.get('/index',[authMiddleware, adminMiddleware], errorHandler(listAllOrders))
orderRoutes.get('/users/:id',[authMiddleware, adminMiddleware], errorHandler(listUserOrders))
orderRoutes.put('/:id/status',[authMiddleware, adminMiddleware], errorHandler(changeStatus))


export default orderRoutes