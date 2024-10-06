import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

// console.log('PORT loaded from .env:', process.env.PORT);

export const PORT = process.env.PORT