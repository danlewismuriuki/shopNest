import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '..';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestsException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/roots';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    let user = await PrismaClient.user.findFirst({ where: { email } })
    if (user) {
        next(new BadRequestsException('User already Exist!', ErrorCode.USER_ALREADY_EXISTS))
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