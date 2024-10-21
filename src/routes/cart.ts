import { Router} from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/carts";

const cartRoutes:Router = Router()

cartRoutes.post('/', [authMiddleware], errorHandler(addItemToCart))
cartRoutes.post('/', [authMiddleware], errorHandler(getCart))
cartRoutes.post('/:id', [authMiddleware], errorHandler(deleteItemFromCart))
cartRoutes.post('/:id', [authMiddleware], errorHandler(changeQuantity))

export default cartRoutes