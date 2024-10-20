import { Request, Response } from "express"
import { ErrorCode } from "../exceptions/roots"
import { User } from '@prisma/client'
import { PrismaClient } from ".."
import { AddressSchema  } from '../schema/users'
import { NotFoundException } from "../exceptions/not-found"


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
        throw new NotFoundException('Address not found', ErrorCode.ADRESS_NOT_FOUND)
    }
}

export const listAddress = async(req: Request, res:Response) => {

}


