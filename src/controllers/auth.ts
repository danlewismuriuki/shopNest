import { Request, Response } from 'express'
import { PrismaClient } from '..';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user = await PrismaClient.user.findFirst({ where: { email } })
    if (!user) {
        throw Error('User does not exists!')
    }
    if (!compareSync(password, user.password)) {
        throw Error('Incorect password')
    }
    const token = jwt.sign({ userId: user.id }, 'JWT_SECRET')

    res.json({ user, token })
}

export default signUp; 