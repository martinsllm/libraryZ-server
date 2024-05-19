import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import User from './User';

class Sale extends Model {
    declare id: number
    declare userId: number
    declare total: number
    declare date: string
}

Sale.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
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
        onUpdate: 'CASCADE'
    },
    total: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: 'sale',
    timestamps: false,
    underscored: true
})

Sale.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

export default Sale;