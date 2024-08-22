import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const PaymentMethod = sequelize.define(
    'PaymentMethod',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        credit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'payment_method',
    }
);

export default PaymentMethod;
