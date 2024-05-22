import { ModelStatic } from 'sequelize';
import Book from '../database/models/Book';
import { resp, respM } from '../utils/resp';
import Category from '../database/models/Category';
import BookCategory from '../database/models/BookCategory';

BookCategory.associations;

class BookService {

    private model: ModelStatic<Book> = Book;

    async get() {
        const books = await this.model.findAll();
        return resp(200, books);
    }

    async getOne(id: number) {
        const book = await this.model.findOne({
            where: { id },
            include: [{ model: Category, as: 'categories' }]
        });
        
        if(!book) return respM(404, 'Book not found!');

        return resp(200, book);
    }

}

export default BookService;