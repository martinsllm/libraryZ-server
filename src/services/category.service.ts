import { ModelStatic } from 'sequelize';
import Category from '../database/models/Category';
import { resp, respM } from '../utils/resp';

class CategoryService {

    private model: ModelStatic<Category> = Category;

    async find(books: number []) {
        const categories = await Promise.all(books.map( async (e) => {
            return await this.model.findByPk(e)
        }));

        if(categories.some((e) => !e)) return respM(404, 'Category not found!');

        return resp(200, categories);

    }

    async get() {
        const categories = await this.model.findAll();
        return resp(200, categories);
    }

    async getOne(id: number) {
        const category = await this.model.findByPk(id);
        if(!category) return respM(404, 'Category not found!')

        return resp(200, category);
    }
}

export default CategoryService;