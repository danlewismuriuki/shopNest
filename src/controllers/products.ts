   import { Request, Response } from "express";
   import { PrismaClient } from "..";
   

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