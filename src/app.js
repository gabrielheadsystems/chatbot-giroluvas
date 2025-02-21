import express from 'express';
import dotenv from 'dotenv';
import whatsappRouter from './routes/whatsappRouter.js';
import './services/whatsapp/connection.js';

// Configuração do dotenv
dotenv.config();

// Inicialização do express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/whatsapp', whatsappRouter);

// Adiciona tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Algo deu errado! Por favor, tente novamente mais tarde.'
    });
});

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Inicialização direta do servidor (sem a função startServer)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
