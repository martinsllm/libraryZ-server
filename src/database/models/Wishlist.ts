import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import User from './User';
import Book from './Book';

class Wishlist extends Model {
    declare bookId: number
    declare userId: number
}

Wishlist.init({
    bookId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'book',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
    },
    userId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
    }
}, {
    sequelize: db,
    tableName: 'wishlist',
    timestamps: false,
    underscored: true
})

User.belongsToMany(Book, {
    foreignKey: 'userId',
    otherKey: 'bookId',
    as: 'books',
    through: Wishlist
})

Book.belongsToMany(User, {
    foreignKey: 'bookId',
    otherKey: 'userId',
    as: 'users',
    through: Wishlist
})

export default Wishlist;