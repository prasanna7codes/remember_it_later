import { Router } from 'express';

const signupRouter = Router();

signupRouter.post('/', (req, res) => {
    const name= req.body.name;
    const password= req.body.password;
    


  
});

export default signupRouter;
