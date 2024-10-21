import { Request, Response } from "express";
import { CreateCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";
import { PrismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/roots";

export const addItemToCart = async (req: Request, res: Response) => {
    // Check for the existence of the same product in the users cart and 
    // alter the quantity as required
    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product;
    try {
        product = await PrismaClient.product.findFirstOrThrow({
            where: {
                id : validatedData.productId
            }
        })
    } catch(err) {
        throw new NotFoundException('Product not found!', ErrorCode.PRODUCT_NOT_FOUND)
    }
    const cart = await PrismaClient.cartItem.create({
        data: {
            userId: req.user.id,
            productId: product.id,
            quantity: validatedData.quantity
        }
    })
    res.json(cart)
}

export const deleteItemFromCart = async (req: Request, res: Response) => {
    // Check if user is deleteing it's own carty item
    await PrismaClient.cartItem.delete({
        where: {
            id : +req.params.id
        }
    })
    res.json({ success: true})
}

export const changeQuantity = async (req: Request, res: Response) => {
    

}

export const getCart = async (req: Request, res: Response) => {
}