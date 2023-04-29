import { Model, DataTypes } from 'sequelize';
import db from '../util/database';
import jwt,{Secret} from 'jsonwebtoken';
import { envVars } from '../constants';

interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;


  createJWT(): string {
    const JWT_SECRET: Secret=envVars.JWT_TOKEN
    return jwt.sign({ userId: this.id, username: this.username }, JWT_SECRET, { expiresIn: envVars.JWT_LIFETIME });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  tableName: 'users'
});


export default User;
