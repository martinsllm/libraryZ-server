import { NextFunction, Request, Response } from 'express';
import BookService from '../services/book.service';

class BookController {
    private service = new BookService();

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.get();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getOne(Number(req.params.id));
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

}

export default BookController;