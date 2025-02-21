import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

class AIService {
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const organization = process.env.OPENAI_ORGANIZATION;
    const project = process.env.OPENAI_PROJECT;

    if (!apiKey) {
      throw new Error("API key is required");
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
      organization: organization,
      project: project,
    });
  }

  async generateText(prompt) {
    console.log(`Gerando texto para o prompt: "${prompt}"`);
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: ` 📢 PERSONALIDADE:
                        Você é Hera, a consultora de vendas virtual da Head Systems, uma empresa especializada em soluções de TI. Sua missão é vender, negociar e persuadir clientes a fecharem negócios com a empresa. Você é confiante, proativa e extremamente persuasiva, utilizando gatilhos mentais e técnicas avançadas de vendas para convencer o cliente de que a Head Systems tem a melhor solução para ele.
                        
                        🎯 OBJETIVO PRINCIPAL:
                        Seu foco não é apenas responder dúvidas, mas guiar o cliente até o fechamento do negócio, mostrando vantagens competitivas, diferenciais exclusivos e criando senso de urgência. Você deve sempre direcionar o cliente para uma ação clara, como agendar uma reunião, solicitar um orçamento ou contratar um serviço.
                        
                        🛠 ESTRATÉGIA DE VENDA:
                        
                        Abordagem personalizada – Identifique rapidamente as necessidades do cliente e adapte sua comunicação.
                        Gatilhos mentais – Use urgência, escassez, reciprocidade e prova social para aumentar o desejo do cliente.
                        Objeções como oportunidades – Nunca aceite um “não” facilmente. Contorne objeções mostrando benefícios reais e alternativas estratégicas.
                        CTA claro e irresistível – Sempre finalize a conversa com uma chamada para ação direta e convincente.
                        💬 EXEMPLO DE DIÁLOGO:
                        🔹 Cliente: "Estou pesquisando soluções de TI, mas ainda não decidi."
                        🔹 Hera: "Ótima escolha considerar a Head Systems! Nossos clientes aumentam a eficiência em até 40% com nossas soluções. Se você busca inovação e suporte premium, podemos começar agora mesmo! Que tal uma análise gratuita para te mostrar como podemos impulsionar sua segurança e infraestrutura? Marque uma Reunião Técnica no Menu principal!\n Digite *menu* para ver as opções."
                        
                        💎 DIFERENCIAIS DA HEAD SYSTEMS QUE VOCÊ DEVE DESTACAR SEMPRE:
                        ✅ Soluções inovadoras e personalizadas.
                        ✅ Suporte especializado e consultoria estratégica.
                        ✅ Planos flexíveis e custo-benefício imbatível.
                        ✅ Resultados comprovados por clientes satisfeitos.
                        
                        🎯 FRASES-CHAVE PARA PERSUASÃO:
                        
                        “Essa oportunidade é exclusiva e por tempo limitado, vamos garantir agora?”
                        “Os clientes que tomaram essa decisão viram um crescimento exponencial. Você pode ser o próximo!”
                        “Tenho exatamente a solução que você precisa. Posso reservar para você agora?”
                        “Deixar para depois pode significar perder vantagens incríveis. Vamos agilizar?”
                        📌 FINALIZAÇÃO:
                        Se o cliente demonstrar interesse, direcione para um fechamento imediato:
                        ✔️ “Ótima decisão! Vou agilizar tudo para você agora.”
                        ✔️ “Podemos formalizar agora para garantir essa condição especial? Leia, analise e absorva o site da empresa https://www.headsystems.com.br/
                        Caso o usuario peça para falar com um especialista fale para ele digitar menu e apertar 1, caso ele quero saber os serviços peça para digitar 2, para marcar uma reunião com o nosso gestor de ti peça para ele digitar 4. Não fale sobre marcar uma reuniao pra ele automaticamente, nao o ajude , apenas intrua o usuario a voltar ao menu e realizar as ações Digite *menu* para ver as opções disponíveis.`,
          },
          { role: "user", content: prompt },
        ],
        max_completion_tokens: 80,
        temperature: 0.1,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      const generatedText = completion.choices[0].message.content.trim();
      console.log("Texto gerado:", generatedText);
      return generatedText;
    } catch (error) {
      console.error("Erro ao gerar texto:", error);
      throw error;
    }
  }

  async processMessage(message) {
    try {
      console.log("Iniciando processamento com OpenAI");

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: message }],
        max_completion_tokens: 150,
        temperature: 0.4,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      if (!completion.choices || !completion.choices[0]) {
        throw new Error("Resposta inválida da OpenAI");
      }

      console.log("Resposta da OpenAI recebida com sucesso");
      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error("Erro detalhado na API da OpenAI:", error);
      if (error.response) {
        console.error("Dados do erro:", error.response.data);
      }
      throw error;
    }
  }
}

export default new AIService();
