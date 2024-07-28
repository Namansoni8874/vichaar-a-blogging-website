import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'



export const blogrouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    },Variables :{
        userId:string,
    }
}>();


//middleware
blogrouter.use("/*", async (c, next) => {           //It means that the route should match any path that starts with /api/v1/blog/ followed by any sequence of characters.
    //take header and verify token auythorization
    const header = c.req.header("authorization") || ""
   try{ const response = await verify(header, "secret")
  
    if (response && typeof response === 'object' && 'id' in response && typeof response.id === 'string') {
     
     c.set('userId',response.id)
    await next();
    } else {
        c.status(403)
        return c.json({ error: "unauthorised" })
    }}catch(e){
        c.status(403);
        return c.json({msg:'unauthorized user'})
    }
})


blogrouter.post('/', async (c) => {
    const body = await c.req.json()   //the body user is sendig to you is something that need to be sanatized. 
    const authorId=c.get("userId")    // usd to sharing variable between different routes,if this gives type error then you need to add varible type at the places where you provided type to hone app
    const prisma = new PrismaClient({        //$extends(withAccelerate()): This method is used to extend the functionality of the PrismaClient instance. withAccelerate() is likely a custom extension or plugin that adds additional functionality or optimizations to the Prisma client.
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
    })
    return c.json({
        id: blog.id
    })
})



blogrouter.put('/', async(c) => {
    const userId=c.get('userId')
    const body=await c.req.json()
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    const blog=await prisma.post.update({
        where:{
            id:body.id,
            authorId:userId
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.text('updted post')
})

blogrouter.get('/id',async (c) => {
    const body=await c.req.json()
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
   try{ const blog=await prisma.post.findFirst({
        where:{
            id:body.id
        }
    })
    return c.json({
        blog
    })
   }catch(e){
    c.status(411)
    return c.json({msg:"error while fetching"})
   } 
   
})

blogrouter.get('/bulk', async(c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs=await prisma.post.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:{
             select:{
                name:true
             }
            }
    
        }
    })
    return  c.json({blogs})
})

