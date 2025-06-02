import { Router } from "express";
import jwt from 'jsonwebtoken';
import {UserModel} from '../db';
import bcrypt from "bcrypt";


const signinRouter = Router ()
const jwt_secret="hello";
 


signinRouter.post('/',async (req,res)=>{
 const {username,password} = req.body;

 const user = await UserModel.findOne({username});

 if (user){
   const present =  bcrypt.compareSync(password,user.password); 
   if(present){

    const token = jwt.sign({ _id: user._id }, jwt_secret);   
     res.json({
        "token":token
    })
    
   } else{
    res.json({
        "message":"invalid password"
    })
   }

 }

 else{
    res.json({
        "message": "user does not exist "
    })
 }
 console.log("after signin")




})


export default signinRouter