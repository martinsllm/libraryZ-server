import { Router } from 'express';
import BookController from '../controllers/book.controller';

const control = new BookController();

const bookRouter = Router();

bookRouter.get('/', control.get.bind(control));
bookRouter.get('/:id', control.getOne.bind(control));
bookRouter.post('/', control.create.bind(control));
bookRouter.put('/:id', control.update.bind(control));
bookRouter.delete('/:id', control.delete.bind(control));

export default bookRouter;