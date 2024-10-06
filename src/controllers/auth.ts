import { Request, Response } from 'express'
import { PrismaClient } from '..';
import { hashSync } from 'bcrypt';

export const signUp = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    let user = await PrismaClient.user.findFirst({ where: { email } })
    if (user) {
        throw Error('User already exists!')
    }
    user = await PrismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}

export default signUp;