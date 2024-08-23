import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface SpendTypeAttributes {
    id: string;
    name: string;
}

const SpendType = sequelize.define<Model<SpendTypeAttributes>>(
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
