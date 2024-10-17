import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '..';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestsException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/roots';
import { NotFoundException } from '../exceptions/not-found';
import { IncorrectPassException } from '../exceptions/incorrect-pass';
import { SignUpSchema } from '../schema/users';
import { JWT_SECRET } from '../secrets';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    SignUpSchema.parse(req.body)
    const { email, password, name } = req.body;

    let user = await PrismaClient.user.findFirst({ where: { email } })
    if (user) {
        throw new BadRequestsException('User already Exist!', ErrorCode.USER_ALREADY_EXISTS);
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let user = await PrismaClient.user.findFirst({ where: { email } })
    if (!user) {
        return next(new NotFoundException('User does Not exists', ErrorCode.USER_NOT_FOUND));
    }
    if (!compareSync(password, user.password)) {
        throw new IncorrectPassException('Incorrect Password', ErrorCode.INCORRECT_PASSWORD);

    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET)

    res.json({ user, token })
}


export const me = async (req: Request, res: Response) => {
    res.json(req.user)
}