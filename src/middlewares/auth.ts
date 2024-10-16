import { NextFunction, Request, Response } from "express";
import { UnauthorzedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/roots";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";

const authMiddleware = async(req: Request, res:Response, next:NextFunction) => {
//1. extract the token from header

}

export default authMiddleware;