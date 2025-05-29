import express from 'express';
import signupRouter from './routes/signup';

const app = express();

app.use(express.json());


app.use('/signup', signupRouter);

app.listen(3000)
