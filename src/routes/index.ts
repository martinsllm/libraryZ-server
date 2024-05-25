import { Router } from 'express';
import userRouter from './UserRouter';
import bookRouter from './BookRouter';
import wishlistRouter from './WishListRouter';
import categoryRouter from './CategoryRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/wishlist', wishlistRouter);
router.use('/category', categoryRouter);

export default router;