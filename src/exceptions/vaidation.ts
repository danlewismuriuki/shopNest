import { HttpException } from "./roots";

export class UprocessaleEntity extends HttpException {
    constructor(message: string, error: any, errorCode: number) {
        super(message, errorCode, 4222, error)
    }
}