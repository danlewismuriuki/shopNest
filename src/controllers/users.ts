import { Request, Response } from "express"
import { ErrorCode } from "../exceptions/roots"
import { User } from '@prisma/client'
import { PrismaClient } from ".."
import { AddressSchema  } from '../schema/users'
import { NotFoundException } from "../exceptions/not-found"


export const addAddress  =async(req: Request, res:Response) => {
    AddressSchema.parse(req.body)
    let user: User;
    try {
        user = await PrismaClient.user.findFirstOrThrow({
            where : {
                id : req.body.userId
            }
        })
    } catch(err) {
        throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND)
    }

    const address = await PrismaClient.address.create({
        data: {
            ...req.body,
            userId: user.id
        }
    })
    res.json(address)
}

export const deleteAddress = async(req: Request, res:Response) => {

}

export const listAddress = async(req: Request, res:Response) => {

}


