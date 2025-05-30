import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from './db';
const jwt_secret = "hello";


declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}



async function middleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.token as string;
    const decoded = jwt.verify(token, jwt_secret) as { _id: string };// i will get the data that i put during the jwt sign

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