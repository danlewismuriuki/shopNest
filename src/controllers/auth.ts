import { Request, Response } from 'express'

export const login = (req: Request, rest: Response) => {
    rest.send('Login works')
}

