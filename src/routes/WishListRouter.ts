import { Router } from 'express';
import WishlistController from '../controllers/wishlist.controller';
import { verifyToken } from '../jwt/jwt';

const control = new WishlistController();

const wishlistRouter = Router();

wishlistRouter.get('/', verifyToken, control.get.bind(control));
wishlistRouter.post('/:id', verifyToken, control.create.bind(control));

export default wishlistRouter;