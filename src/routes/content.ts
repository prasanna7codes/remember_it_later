import middleware from '../middleware'
import { ContentModel } from '../db';

import { Router } from 'express';
const contentRouter = Router ();



// Wrap async middleware to handle errors , copilot helped here
contentRouter.use((req, res, next) => {
    Promise.resolve(middleware(req, res, next)).catch(next);
});

contentRouter.post('/',async (req,res)=>{

    const {link,type,title}=req.body;

    await ContentModel.create({
        link,type,title, userId : req.userId
    })

    res.send("content created")



})


export default contentRouter 