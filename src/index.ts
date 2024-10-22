import express, { Express, Request, Response } from 'express';
import { PORT } from './secrets'
import rootRouter from './routes/index';
import { PrismaClient as PrismaClientType } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express()

app.use(express.json())

app.use('/api', rootRouter)

export const PrismaClient = new PrismaClientType({
    log: ['query']
}).$extends({
    result:{
        address: {
            formattedAddress: {
                needs : {
                    lineOne: true,
                    lineTwo: true,
                    city: true,
                    country: true,
                    pincode: true
                },
                compute: (addr) => {
                    return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}`
                }
            }
        }
    }
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});