import { HttpException } from "../exceptions/roots";
import { NextFunction, Request, Response } from "express";
export errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction)