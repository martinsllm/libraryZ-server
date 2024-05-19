import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import Book from './Book';
import Sale from './Sale';

class BookSale extends Model {
    declare bookId: number
    declare saleId: number
    declare quantity: number
}

BookSale.init({
    bookId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    saleId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sale',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'book_sale',
    timestamps: false,
    underscored: true
})

Book.belongsToMany(Sale, {
    foreignKey: 'bookId',
    otherKey: 'saleId',
    as: 'sales',
    through: BookSale
})

Sale.belongsToMany(Book, {
    foreignKey: 'saleId',
    otherKey: 'bookId',
    as: 'books',
    through: BookSale
})

export default BookSale;