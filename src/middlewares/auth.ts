import { NextFunction, Request, Response } from "express";
import { UnauthorzedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/roots";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "..";

const authMiddleware = async(req: Request, res:Response, next:NextFunction) => {
//1. extract the token from header
const token = req.headers.authorization
// if toen not present throw an error of Unauthorized
if(!token) {
    next(new UnauthorzedException('Unauthorized', ErrorCode.UNAUTHORIZED))
}
// if token is present, verify that token and extract the payload

try {
    const payload: { userId:number} = jwt.verify(token, JWT_SECRET)
    const user = await PrismaClient.user.findFirst({where: {id: payload.userId}})
    if (!user) {
        next(new UnauthorzedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }


} catch(error) {
    next(new UnauthorzedException('Unauthorized', ErrorCode.UNAUTHORIZED))
}

}
export default authMiddleware;