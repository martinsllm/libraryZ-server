import { ModelStatic } from 'sequelize';
import Wishlist from '../database/models/Wishlist';
import Book from '../database/models/Book';
import User from '../database/models/User';
import BookService from './book.service';
import { resp, respM } from '../utils/resp';

class WishlistService {

    private model: ModelStatic<Wishlist> = Wishlist;
    private book = new BookService();

    async get(id: number) {
        const wishlist = await User.findOne({
            where: { id },
            attributes: { exclude: ['password', 'email'],}, 
            include: { model: Book, as: 'books'}
        });

        return resp(200, wishlist);
    }

    async getOne(bookId: number, userId: number) {
        const wishlist = await this.model.findOne({
            where: {
                bookId, userId
            }
        })

        if(!wishlist) return respM(404, '');

        return resp(200, wishlist);
    }

    async create(bookId: number, userId: number) {
        const foundBook = await this.book.getOne(bookId);
        if(foundBook.status == 404) return respM(404, foundBook.message);

        const wishlist = await this.getOne(bookId, userId);

        if(wishlist.status != 404) {
            await this.model.destroy({
                where: {
                    bookId, userId
                }
            });

            return resp(204, '');
        }

        await this.model.create({
            bookId, userId
        });

        return resp(201, '');

    }

}

export default WishlistService;