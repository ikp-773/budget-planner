import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Category from './category';
import PaymentMethod from './payment_method';
import SpendType from './spend_type';
import User from './user';

const Expenditure = sequelize.define(
    'Expenditure',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: SpendType,
                key: 'id',
            },
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Category,
                key: 'id',
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payment_method_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: PaymentMethod,
                key: 'id',
            },
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
        tableName: 'expenditure',
    }
);

// Associations
User.hasMany(Expenditure, { foreignKey: 'user_id' });
Expenditure.belongsTo(User, { foreignKey: 'user_id' });

SpendType.hasMany(Expenditure, { foreignKey: 'type_id' });
Expenditure.belongsTo(SpendType, { foreignKey: 'type_id' });

Category.hasMany(Expenditure, { foreignKey: 'category_id' });
Expenditure.belongsTo(Category, { foreignKey: 'category_id' });

PaymentMethod.hasMany(Expenditure, { foreignKey: 'payment_method_id' });
Expenditure.belongsTo(PaymentMethod, { foreignKey: 'payment_method_id' });

export default Expenditure;
