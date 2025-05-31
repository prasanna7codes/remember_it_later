import express from 'express';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';
import contentRouter from './routes/content';
import middleware from './middleware'
import {LinkModel} from './db';
import random from './utils';
import { Request, Response, NextFunction } from 'express';


 


import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config()

const app = express();

app.use(express.json());


app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/content', contentRouter);


// Wrap async middleware to handle errors , copilot helped here
function asyncHandler(fn: (...args: any[]) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

//creating a sharable link
app.post('/brain/share',asyncHandler(middleware),async (req,res)=>{
const share = req.body.share;
if(share){
    await LinkModel.create({
        hash:random(10),
        userId:req.userId
    })

}else{
    await LinkModel.deleteOne({
        userId: req.userId
    })
} 


res.send("link updated ")



})


const uri = process.env.MONGODB;

async function main () {
  if (!uri) {
	throw new Error('MONGODB environment variable is not defined');
  }
  await mongoose.connect(uri);
  app.listen(3000);
}

main()
