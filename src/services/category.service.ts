import { ModelStatic } from 'sequelize';
import Category from '../database/models/Category';
import { ICategory } from '../interfaces/ICategory';
import { resp, respM } from '../utils/resp';
import schema from './validation/schema';

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

    async create(cat: ICategory) {
        const { error } = schema.category.validate(cat);
        if(error) return respM(422, error.message);

        const createdCategory = await this.model.create({
            ...cat
        });

        return resp(201, createdCategory);
    }

    async update(cat: ICategory, id: number) {
        const { error } = schema.category.validate(cat);
        if(error) return respM(422, error.message);

        const foundCategory = await this.getOne(id);

        if(foundCategory.status != 404) {
            await this.model.update({ 
                ...cat 
            }, { 
                where: { id } 
            });

            foundCategory.status = 204;
        }

        return resp(foundCategory.status, foundCategory.message);
    }

    async delete(id: number) {
        const foundCategory = await this.getOne(id);

        if(foundCategory.status != 404) {
            await this.model.destroy({
                where: { id }
            });

            foundCategory.status = 204;
        }

        return resp(foundCategory.status, foundCategory.message);
    }
}

export default CategoryService;