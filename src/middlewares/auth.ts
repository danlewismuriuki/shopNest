import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
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
    console.error("Authorization token is missing");
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    return;
}
// if (!JWT_SECRET) {
//     return next(new UnauthorizedException('JWT secret is not defined', ErrorCode.UNAUTHORIZED));
// }
// if token is present, verify that token and extract the payload

try {
    const payload  = jwt.verify(token, JWT_SECRET) as any
    console.log("Token payload:", payload); // Log the payload
    
    const user = await PrismaClient.user.findFirst({where: {id: payload.userId}})
    if (!user) {
        console.error("User not found for ID:", payload.userId);
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
    req.user = user
    next()
} catch(error) {
    console.error("Token verification error:", error); // Log errors
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
}

}
export default authMiddleware;


// const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Expecting 'Bearer <token>'
//     if (!token) {
//         console.error("Authorization token is missing");
//         return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
//     }

//     try {
//         const payload = jwt.verify(token, JWT_SECRET) as any;
//         console.log("Token payload:", payload); // Log the payload

//         const user = await PrismaClient.user.findFirst({ where: { id: payload.userId } });
//         if (!user) {
//             console.error("User not found for ID:", payload.userId);
//             return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
//         }

//         req.user = user; // Attach the user to the request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error("Token verification error:", error); // Log errors
//         return next(new UnauthorizedException('Invalid token', ErrorCode.UNAUTHORIZED));
//     }
// }

// export default authMiddleware;
