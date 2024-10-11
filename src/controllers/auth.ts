import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '..';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestsException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/roots';
import { NotFoundException } from '../exceptions/not-found';
import { IncorrectPassException } from '../exceptions/incorrect-pass';
import { SignUpSchema } from '../schema/users';
import { UprocessableEntity } from '../exceptions/validation';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        SignUpSchema.parse(req.body)
        const { email, password, name } = req.body;
        let user = await PrismaClient.user.findFirst({ where: { email } })
        if (user) {
            next(new BadRequestsException('User already Exist!', ErrorCode.USER_ALREADY_EXISTS));
            return;
        }
        user = await PrismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        })
        res.json(user)
    } catch (err: any) {
        next(new UprocessableEntity(err?.issues, 'Unprocessed entity', ErrorCode.UNPROCESSABLE_ENTITY))
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let user = await PrismaClient.user.findFirst({ where: { email } })
    if (!user) {
        return next(new NotFoundException('User does Not exists', ErrorCode.USER_NOT_FOUND));
    }
    if (!compareSync(password, user.password)) {
        return next(new IncorrectPassException('Incorrect Password', ErrorCode.INCORRECT_PASSWORD));

    }
    const token = jwt.sign({ userId: user.id }, 'JWT_SECRET')

    res.json({ user, token })
}