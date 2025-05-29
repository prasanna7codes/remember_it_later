import express from 'express';
import signupRouter from './routes/signup';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config()

const app = express();

app.use(express.json());


app.use('/signup', signupRouter);


const uri = process.env.MONGODB;

async function main () {
  if (!uri) {
	throw new Error('MONGODB environment variable is not defined');
  }
  await mongoose.connect(uri);
  app.listen(3000);
}

main()
