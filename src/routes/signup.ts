import { Router } from 'express';

import {UserModel} from '../db'
import bcrypt from "bcrypt";

const signupRouter = Router();

signupRouter.post('/', async (req,res) => {
    const username= req.body.username;
    const password= req.body.password;

    console.log('BODY:', req.body);

    //checking the username and password criteria are met 

      if (!/^[a-zA-Z]{3,10}$/.test(username)) {
     res.status(411).json({ message: 'Username must be 3–10 letters only' });
     return;
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)
  ) {
     res.status(411).json({
      message:
        'Password must be 8–20 characters, include one uppercase, one lowercase, one number, and one special character',
    });
    return;
  }
  

  //checking if the user exists 
  const user = await UserModel.findOne({username});

  if(user) {

res.status(403).json({ 
            message: "This user is alredy existing in our database" }) 
return 
  }
  else {
// hashing the password and then storing in the database 
    const hash = bcrypt.hashSync(password,5);

    
    await UserModel.create({
    username,password:hash
  })
    res.send("you are signed up ")

  }

});

export default signupRouter;