import express from 'express';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';
import contentRouter from './routes/content';
import middleware from './middleware'
import {LinkModel,ContentModel,UserModel} from './db';
import random from './utils';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors'




 


import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config()

const app = express();

app.use(cors({
  origin: 'https://second-brain-cohort-frontend.vercel.app',
  credentials: true
}));
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
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })// here we are giving the link to the user if he already has a link created
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }

})

 
app.get("/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

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
