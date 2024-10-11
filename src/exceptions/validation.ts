import { HttpException } from "./roots";

export class UprocessableEntity extends HttpException {
    constructor(message: string, error: any, errorCode: number) {
        super(message, errorCode, 422, error)
    }
}