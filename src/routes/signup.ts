import { Router } from 'express';

import {UserModel} from '../db'

const signupRouter = Router();

signupRouter.post('/', async (req,res) => {
    const username= req.body.name;
    const password= req.body.password;

    //checking the username and password criteria are met 

      if (!/^[a-zA-Z]{3,10}$/.test(username)) {
     res.status(411).json({ message: 'Username must be 3–10 letters only' });
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)
  ) {
     res.status(411).json({
      message:
        'Password must be 8–20 characters, include one uppercase, one lowercase, one number, and one special character',
    });
  }
  

  //checking if the user exists 
   const user = await UserModel.findOne({username});
   

  if(user) {

    res.status(403).json({"message":"user already exists"});

  }
  else {
    await UserModel.create({
    username,password
  })

  }
    



    


  
});

export default signupRouter;