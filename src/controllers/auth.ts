import { Request, Response } from 'express'

export const signUp = (req: Request, rest: Response) => {
    const { email, password, name } = req.body;
}

export default signUp;