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
            const { status, message } = await this.service.getOne(+req.params.id);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.create(req.body);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.update(req.body, +req.params.id);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.delete(+req.params.id);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

}

export default BookController;