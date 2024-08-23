import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

interface UserAttributes {
    id: string;
    name: string;
    mailId: string;
    password: string;
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

export interface UserUpdationAttributes extends Partial<UserAttributes> {}

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {}

const User = sequelize.define<UserInstance>(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mailId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 20],
            },
        },
    },
    {
        timestamps: true,
        tableName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                if (user.dataValues.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.dataValues.password = await bcrypt.hash(
                        user.dataValues.password,
                        salt
                    );
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.dataValues.password = await bcrypt.hash(
                        user.dataValues.password,
                        salt
                    );
                }
            },
        },
    }
);

export default User;
