import express from 'express';
import chatController from '../controllers/chatController.js';
import User from '../models/User.js';
import Chat from '../models/Chat.js';

const router = express.Router();

// Rota para histórico de chat de um usuário
router.get('/history/:userId', async (req, res) => {
    try {
        const chats = await Chat.findAll({
            where: { userId: req.params.userId },
            order: [['createdAt', 'DESC']]
        });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para enviar mensagem via API
router.post('/send', async (req, res) => {
    try {
        const { phoneNumber, message } = req.body;
        const response = await chatController.processMessage({
            from: phoneNumber,
            body: message
        });
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para listar todos os usuários
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Chat,
                limit: 1,
                order: [['createdAt', 'DESC']]
            }]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
