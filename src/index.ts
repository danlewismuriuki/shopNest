import express, { Express, Request, Response } from 'express';
import { PORT } from './secrets'
import rootRouter from './routes/index';
import { PrismaClient as PrismaClientType } from '@prisma/client';

const app: Express = express()

app.use(express.json())

app.use('/api', rootRouter)

export const PrismaClient = new PrismaClientType({
    log: ['query']
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});