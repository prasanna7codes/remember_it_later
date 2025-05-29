import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const jwt_secret="hello";

declare module 'express-serve-static-core' {
  interface Request {
    username?: string;
  }
}



function middleware(req :Request, res: Response, next: NextFunction){
            const token = req.headers.token as string;
            const decoded= jwt.verify(token,jwt_secret) as { username: string };
            
             if(decoded){
               req.username = decoded.username ;
                next()
             }

             else {
                res.send("invalid token")
             }
}


export default middleware;