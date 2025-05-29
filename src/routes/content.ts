import middleware from '../middleware'

import { Router } from 'express';
const contentRouter = Router ();

contentRouter.use(middleware);

contentRouter.get('/',(req,res)=>{
    res.send("you are signed in by token ")
})


export default contentRouter 