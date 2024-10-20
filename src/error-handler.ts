import { Request, Response, NextFunction } from "express";
import { HttpException, ErrorCode } from "./exceptions/roots";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestsException } from "./exceptions/bad-request";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            }  else {
                if ( error instanceof ZodError) {
                    exception = new BadRequestsException('Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY, error)
                } else {
                    exception = new InternalException('Something went Wrong!', error, ErrorCode.INTERNAL_EXCEPTION)
                }
            }
            next(exception)
        }
    }
}