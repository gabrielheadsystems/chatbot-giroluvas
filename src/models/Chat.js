import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class Chat extends Model {}

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("active", "closed"),
    defaultValue: "active"
  },
  context: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  sequelize,
  modelName: 'Chat'
});

export default Chat;
