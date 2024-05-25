import { NextFunction, Request, Response } from 'express';
import WishlistService from '../services/wishlist.service';

class WishlistController {

    private service = new WishlistService;

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.create(+req.params.id, res.locals.user.id);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

}

export default WishlistController;