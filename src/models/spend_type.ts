import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const SpendType = sequelize.define(
    'SpendType',
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
    },
    {
        timestamps: false,
        tableName: 'spend_type',
    }
);

export default SpendType;
