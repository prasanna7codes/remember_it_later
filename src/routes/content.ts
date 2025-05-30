import middleware from '../middleware'
import { ContentModel } from '../db';

import { Router } from 'express';
const contentRouter = Router ();



// Wrap async middleware to handle errors , copilot helped here
contentRouter.use((req, res, next) => {
    Promise.resolve(middleware(req, res, next)).catch(next);
});


//user sending data to the database 
contentRouter.post('/',async (req,res)=>{

    const {link,type,title}=req.body;

    await ContentModel.create({
        link,type,title, userId : req.userId
    })

    res.send("content created")



})

// user seeing its data 
contentRouter.get('/view_me',async (req,res)=>{

    const id= req.userId;
    const result = await ContentModel.find({userId:id})

    res.json({result})

})


contentRouter.put('/update_content',async (req,res)=>{

    const {link,type,title}=req.body;
    const result = await ContentModel.updateMany(
      { userId: req.userId }, 
      { link, type, title }
    );
 

    res.json({
        message: 'All user content updated successfully'
    })


})








export default contentRouter 