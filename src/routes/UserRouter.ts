import { Router } from 'express';
import UserController from '../controllers/user.controller';

const control = new UserController();

const userRouter = Router();

userRouter.get('/', control.get.bind(control));
userRouter.post('/', control.create.bind(control));
userRouter.post('/login', control.login.bind(control));

export default userRouter;