import AIService from "../services/ai/openai.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

class ChatController {
  async processMessage(message) {
    try {
      console.log('Mensagem recebida:', message.body);
      
      // Encontrar ou criar usuário
      const [user] = await User.findOrCreate({
        where: { phoneNumber: message.from },
        defaults: { name: "Unknown" }
      });
      console.log('Usuário:', user.phoneNumber);

      // Processar mensagem com IA
      const aiResponse = await AIService.processMessage(message.body);
      console.log('Resposta da IA:', aiResponse);

      // Salvar conversa
      await Chat.create({
        userId: user.id,
        message: message.body,
        response: aiResponse
      });

      return aiResponse;
    } catch (error) {
      console.error("Erro no processamento:", error);
      throw error;
    }
  }
}

export default new ChatController();
