import z from 'zod'

export const signupinput=z.object({
    username:z.string().email(),
    password:z.string(),
    name:z.string().optional()
})

export type SignupInput=z.infer< typeof signupinput>

export const signininput=z.object({
    username:z.string().email(),
    password:z.string()
})

export type SigninInput=z.infer<typeof signininput>


export const bloginput=z.object({
    title:z.string(),
    content:z.string()
})

export type BlogInput=z.infer<typeof bloginput>


export const updteblog=z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
})

export type UpdateBlog=z.infer<typeof updteblog>