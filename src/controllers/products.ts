   import { Request, Response } from "express";
   import { PrismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/roots";
   

   export const createProduct = async(req:Request, res:Response) => {
    
    //create a validator for the request


    console.log("Request body:", req.body);
    const product = await PrismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(','),
        }
    })
    res.json(product)
   }

   export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',')
        }
        const productId = +req.params.id;
        const updateProduct = await PrismaClient.product.update({
            where : {
                id : productId
            },
            data: product
        })
        res.json(updateProduct)
    } catch(err) {
        throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
    }
   }

   export const deleteProduct = async (req: Request, res: Response) => {
    try {
    
        const productId = +req.params.id;
        const deleteProduct = await PrismaClient.product.delete({
            where : {
                id: productId
            }
        })
        res.json(deleteProduct)
    } catch(err) {
        throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
    }
   }

   export const listProducts = async (req: Request, res: Response) => {

   }

   export const getProductById = async (req: Request, res: Response) => {

   }
