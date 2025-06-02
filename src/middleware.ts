import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from './db';
const jwt_secret = "hello";

// got this from chatgpt , will learn later 
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}



async function middleware(req: Request, res: Response, next: NextFunction) {
  console.log("Headers:", req.headers); // Add this line
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("No token provided");
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    const decoded = jwt.verify(token, jwt_secret) as { _id: string };

    console.log("after decoding")

  
    if (decoded) {
      const user = await UserModel.findById(decoded._id);
      if (!user) {
        return res.status(401).send("User not found");
      }
      req.userId = user._id.toString();
      return next();
    } else {
      return res.status(401).send("Invalid token");
    }
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

export default middleware;