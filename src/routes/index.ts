import { Router } from 'express';
import userRouter from './UserRouter';
import bookRouter from './BookRouter';

const router = Router();

router.use(userRouter);
router.use(bookRouter);

export default router;