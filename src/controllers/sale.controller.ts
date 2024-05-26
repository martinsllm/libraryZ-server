import { NextFunction, Request, Response } from 'express';
import SaleService from '../services/sale.service';

class SaleController {

    private service = new SaleService();

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.create(req.body, res.locals.user.id);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

}

export default SaleController;