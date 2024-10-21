import { Request, Response } from "express"
import { ErrorCode } from "../exceptions/roots"
import { Address, User } from '@prisma/client'
import { PrismaClient } from ".."
import { AddressSchema, UpdateUserSchema  } from '../schema/users'
import { NotFoundException } from "../exceptions/not-found"
import { BadRequestsException } from "../exceptions/bad-request"


export const addAddress  =async(req: Request, res:Response) => {
    AddressSchema.parse(req.body)

    const address = await PrismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })
    res.json(address)
}

export const deleteAddress = async(req: Request, res:Response) => {
    try {
        await PrismaClient.address.delete({
            where : {
                id: +req.params.id
            }
        })
        res.json({success: true})
    } catch (err) {
        throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND)
    }
}

export const listAddress = async(req: Request, res:Response) => {
    const addresses = await PrismaClient.address.findMany({
        where: {
            userId: req.user.id
        }
    }) 
    res.json(addresses)
}

export const UpdateUser = async(req: Request, res: Response) => {
    console.log("Update user called")
    const validatedData = UpdateUserSchema.parse(req.body)
    let shippingAddress: Address;
    let billingAddress: Address;

    if (validatedData.defaultShippingAddress) {
        console.log("Update user called")
        try{
            shippingAddress = await PrismaClient.address.findFirstOrThrow({
                where: {
                    id : validatedData.defaultShippingAddress
                }
            }) 
        } catch (error){
            throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND)
        }
        if (shippingAddress.userId != req.user.id) {
            throw new BadRequestsException('Address does not belong to the user', ErrorCode.ADDRESS_DOES_NOT_BELONG)
        }
    }
    if (validatedData.defaultBillingAddress) {
        try{
            billingAddress = await PrismaClient.address.findFirstOrThrow({
                where: {
                    id : validatedData.defaultBillingAddress
                }
            })
        } catch ( error){
            throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND)
        }
        if (billingAddress.userId != req.user.id) {
            throw new BadRequestsException('Address does not belong to the user', ErrorCode.ADDRESS_DOES_NOT_BELONG)
        }
    }
    const updatedUser = await PrismaClient.user.update({
        where: {
            id: req.user.id
        },
        data: validatedData
    })
    res.json(updatedUser)
}
