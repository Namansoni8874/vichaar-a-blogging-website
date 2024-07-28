import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Userrouter } from './routes/User'
import { blogrouter } from './routes/Blog'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
}>()
app.use('/*', cors())
app.route('/api/v1/',Userrouter)
app.route('/api/v1/blog',blogrouter)




export default app
