import { Hono } from 'hono';
import userRouter from "./user";
import blogRouter from "./blog";
const app = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>();
app.route("/user", userRouter)
app.route("/blog", blogRouter)

export default app;