import { Router } from 'express';
import BookController from '../controllers/book.controller';

const control = new BookController();

const bookRouter = Router();

bookRouter.get('/book', control.get.bind(control));
bookRouter.get('/book/:id', control.getOne.bind(control));
bookRouter.post('/book', control.create.bind(control));
bookRouter.put('/book/:id', control.update.bind(control));

export default bookRouter;