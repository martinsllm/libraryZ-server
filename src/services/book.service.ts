import { ModelStatic } from 'sequelize';
import { IBook } from '../interfaces/IBook';
import schema from './validation/schema';
import Book from '../database/models/Book';
import Category from '../database/models/Category';
import { resp, respM } from '../utils/resp';
import CategoryService from './category.service';
import BookCategoryService from './bookCategory.service';

class BookService {

    private model: ModelStatic<Book> = Book;
    private category = new CategoryService();
    private bookCategory = new BookCategoryService();

    async find(books: { bookId: number, quantity: number }[]) {
        const foundBooks = await Promise.all(books.map( async (e) => {
            return await this.model.findByPk(e.bookId)
        }));

        if(foundBooks.some((e) => !e)) return respM(404, 'Book not found!');

        return resp(200, foundBooks);

    }

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

    async create(book: IBook) {
        const { error } = schema.book.validate(book);
        if(error) return respM(422, error.message);

        const categories = await this.category.find(book.categories!);
        if(categories.status == 404) return respM(404, categories.message);

        const createdBook = await this.model.create({ ...book });

        await this.bookCategory.create(book.categories!, createdBook.id);

        return resp(201, createdBook);
    }

    async update(book: IBook, id: number) {
        const { error } = schema.book.validate(book);
        if(error) return respM(422, error.message);
        
        const foundBook = await this.getOne(id);

        if(foundBook.status != 404){
            await this.model.update({ 
                ...book 
            }, { 
                where: { id } 
            });

            foundBook.status = 204;
        }

        return resp(foundBook.status, foundBook.message);
    }

    async delete(id: number) {
        const foundBook = await this.getOne(id);

        if(foundBook.status != 404){
            await this.model.destroy({
                where: { id }
            });

            foundBook.status = 204;
        }

        return resp(foundBook.status, foundBook.message);
    }

}

export default BookService;