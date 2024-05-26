import { Router } from 'express';
import SaleController from '../controllers/sale.controller';
import { verifyToken } from '../jwt/jwt';

const control = new SaleController();

const saleRouter = Router();

saleRouter.post('/', verifyToken, control.create.bind(control));

export default saleRouter;