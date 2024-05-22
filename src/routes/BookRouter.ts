import { Router } from 'express';
import BookController from '../controllers/book.controller';

const control = new BookController();

const bookRouter = Router();

bookRouter.get('/book', control.get.bind(control));
bookRouter.get('/book/:id', control.getOne.bind(control));

export default bookRouter;