import { Request, Response } from "express";
import { CreateCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";
import { PrismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/roots";

export const addItemToCart = async (req: Request, res: Response) => {
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
}

export const changeQuantity = async (req: Request, res: Response) => {
}

export const getCart = async (req: Request, res: Response) => {
}