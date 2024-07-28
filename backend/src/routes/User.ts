import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode ,sign,verify  } from 'hono/jwt'



export const Userrouter=new Hono<{
    Bindings:{
      DATABASE_URL:string
    }
  }>()

  Userrouter.post('/signup', async (c) => {
    const prisma=new PrismaClient({
      //@ts-ignore
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
   const body=await  c.req.json()    //converting body request into json thats why await is required
   const user=await prisma.user.create({
    data:{
        name:body.name,
        email:body.email,
        password:body.password
    },
   })
  const token=await sign({id:user.id},"secret")
  
  
    return c.json({jwt:token})
  })
  
Userrouter.post('/signin', async(c) => {
    const prisma=new PrismaClient({
      //@ts-ignore
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     
    const body= await c.req.json()
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
     return c.text("user does not exist")
    }
    const token=await sign({id:user.id},"secret")
    return c.json({jwt:token})
  }) 
  
  