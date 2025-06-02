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



// Allow only your deployed frontend origin
const allowedOrigins = [
  'https://second-brain-cohort-frontend.vercel.app',

];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: "GET, PUT, POST, DELETE",
  allowedHeaders: ['Content-Type', 'Authorization',] // Add this line
}));

//app.options('*', cors()); // Enable preflight for all routes
console.log("after cors")

//app.options('*', cors()); // Enable preflight for all routes
app.use(express.json());
console.log("after express")




app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/content', contentRouter);

console.log("after routers")

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

 console.log("after share brain")

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
console.log("after share brain again")


const uri = process.env.MONGODB;

async function main () {
  if (!uri) {
	throw new Error('MONGODB environment variable is not defined');
  }
  await mongoose.connect(uri);
  console.log("before")

  app.listen(3000);
}

main()
