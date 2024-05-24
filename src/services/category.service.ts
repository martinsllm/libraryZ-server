import { ModelStatic } from 'sequelize';
import Category from '../database/models/Category';
import { resp, respM } from '../utils/resp';

class CategoryService {

    private model: ModelStatic<Category> = Category;

    async get(books: number []) {

        const categories = await Promise.all(books.map( async (e) => {
            return await this.model.findByPk(e)
        }));

        if(categories.some((e) => !e)) return respM(404, 'Category not found!');

        return resp(200, categories);

    }
}

export default CategoryService;