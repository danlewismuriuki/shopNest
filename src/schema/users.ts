import { string, z } from 'zod'

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const AddressSchema = z.object({
    lineOne: z.string(),
    linerTwo: z.string().nullable(),
    city: z.string(),
    country: z.string(),
    pincode: z.string().length(6),
    userId: z.number()
})

