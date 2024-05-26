import { Router } from 'express';
import userRouter from './UserRouter';
import bookRouter from './BookRouter';
import wishlistRouter from './WishListRouter';
import categoryRouter from './CategoryRouter';
import saleRouter from './SaleRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/wishlist', wishlistRouter);
router.use('/category', categoryRouter);
router.use('/sale', saleRouter);

export default router;