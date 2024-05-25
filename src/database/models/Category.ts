import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';

class Category extends Model {
    declare id: number
    declare name: string
}

Category.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize: db,
    tableName: 'category',
    timestamps: false
})

export default Category;