import { ModelStatic } from 'sequelize';
import Sale from '../database/models/Sale';
import { ISale } from '../interfaces/ISale';
import schema from './validation/schema';
import BookService from './book.service';
import BookSaleService from './bookSale.service';
import { resp, respM } from '../utils/resp';

class SaleService {

    private model: ModelStatic<Sale> = Sale;
    private book = new BookService();
    private bookSale = new BookSaleService();

    async create(sale: ISale, userId: number) {
        const { error } = schema.sale.validate(sale);
        if(error) return respM(422, error.message);

        const books = await this.book.find(sale.books!);
        if(books.status == 404) return respM(404, books.message);

        const createdSale = await this.model.create({ ...sale, userId });

        await this.bookSale.create(sale.books!, createdSale.id);

        return resp(201, createdSale);
    }

}

export default SaleService;