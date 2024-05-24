import { ModelStatic } from 'sequelize';
import BookCategory from '../database/models/BookCategory';

class BookCategoryService {

    private model: ModelStatic<BookCategory> = BookCategory;

    async create(categories: number [], bookId: number) {

        const bookCategory = categories.map((e) => ({
            bookId: bookId,
            categoryId: e
        }));

        await this.model.bulkCreate(bookCategory);
    }
}

export default BookCategoryService;