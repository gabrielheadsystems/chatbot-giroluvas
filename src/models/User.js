import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import Chat from "./Chat.js";

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastInteraction: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

User.hasMany(Chat);
Chat.belongsTo(User);

export default User;
