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

//updating one content at a time
contentRouter.put('/update_content',async (req,res)=>{

    const {contentId,link,type,title}=req.body;
    const result = await ContentModel.findOneAndUpdate(
      { _id:contentId, userId: req.userId }, //this will check for the excat _id in the table and see if the user owns that or not 
      { link, type, title }
    );
 

    res.json({
        message: 'one  content updated successfully'
    })


})


contentRouter.delete('/delete_content',async (req,res)=>{

    const {contentId}=req.body;
    const result = await ContentModel.findOneAndDelete(
      { _id:contentId,
        userId: req.userId }, //this will check for the excat _id in the table and see if the user owns that or not 
      
    );
 

        res.json({ message: 'Content deleted successfully' });



})











export default contentRouter 