import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: false
});

// Testar conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

// Adicionar função para sincronizar modelos
async function syncModels() {
  try {
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error);
  }
}

export { sequelize, testConnection, syncModels };