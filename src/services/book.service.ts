import { ModelStatic, where } from 'sequelize';
import Book from '../database/models/Book';
import { resp, respM } from '../utils/resp';
import Category from '../database/models/Category';
import BookCategory from '../database/models/BookCategory';
import { IBook } from '../interfaces/IBook';
import schema from './validation/schema';

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

    async create(book: IBook) {
        const { error } = schema.book.validate(book);

        if(error) return respM(422, error.message);

        const categories = await Promise.all(book.categories!.map( async (e) => {
            return await Category.findByPk(e)
        }));

        if(categories.some((e) => !e)) return respM(404, 'Category not found!');

        const createdBook = await this.model.create({ ...book });

        const bookCategory = book.categories!.map((e) => ({
            bookId: createdBook.id,
            categoryId: e
        }));

        await BookCategory.bulkCreate(bookCategory);

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