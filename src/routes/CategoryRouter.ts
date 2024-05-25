import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const control = new CategoryController();

const categoryRouter = Router();

categoryRouter.get('/', control.get.bind(control));
categoryRouter.post('/', control.create.bind(control));
categoryRouter.put('/:id', control.update.bind(control));
categoryRouter.delete('/:id', control.delete.bind(control));

export default categoryRouter;