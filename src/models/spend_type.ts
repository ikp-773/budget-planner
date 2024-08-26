import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SpendTypeAttributes {
    id: string;
    name: string;
}

export interface SpendTypeCreationAttributes
    extends Optional<SpendTypeAttributes, 'id'> {}

export interface SpendTypeUpdateAttributes
    extends Partial<SpendTypeAttributes> {}

interface SpendTypeInstance
    extends Model<SpendTypeAttributes, SpendTypeCreationAttributes>,
        SpendTypeAttributes {}

const SpendType = sequelize.define<SpendTypeInstance>(
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
