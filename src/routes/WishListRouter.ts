import { Router } from 'express';
import WishlistController from '../controllers/wishlist.controller';
import { verifyToken } from '../jwt/jwt';

const control = new WishlistController();

const wishlistRouter = Router();

wishlistRouter.post('/:id', verifyToken, control.create.bind(control));

export default wishlistRouter;