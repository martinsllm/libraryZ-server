import { ModelStatic } from 'sequelize';
import BookSale from '../database/models/BookSale';

class BookSaleService {

    private model: ModelStatic<BookSale> = BookSale;

    async create(books: { bookId: number, quantity: number }[], saleId: number) {

        const bookSale = books.map((e) => ({
            saleId,
            ...e
        }));

        await this.model.bulkCreate(bookSale);

    }

}

export default BookSaleService;