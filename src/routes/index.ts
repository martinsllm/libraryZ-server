import { Router } from 'express';
import userRouter from './UserRouter';
import bookRouter from './BookRouter';
import wishlistRouter from './WishListRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/wishlist', wishlistRouter);

export default router;