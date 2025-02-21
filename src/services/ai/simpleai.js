import emailService from "../email/mailservice.js";
import AIService from "./openai.js"; 

class SimpleAI {
  static lgpdTerms = {
    message:
      "📜 *Termo de Consentimento para Uso de Chatbot - Head Systems*\n\n" +
      "1. **Introdução**\n" +
      "Este Termo de Consentimento tem como objetivo esclarecer os direitos e responsabilidades dos usuários ao interagir com o chatbot da Head Systems, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).\n\n" +
      "2. **Coleta e Tratamento de Dados**\n" +
      "Ao utilizar o chatbot da Head Systems, o usuário declara estar ciente de que alguns dados pessoais podem ser coletados, incluindo, mas não se limitando a:\n" +
      "- Nome completo;\n" +
      "- Endereço de e-mail;\n" +
      "- Número de telefone;\n" +
      "- Outras informações fornecidas voluntariamente pelo usuário durante a interação.\n\n" +
      "Os dados coletados serão utilizados exclusivamente para:\n" +
      "- Melhorar a experiência do usuário no atendimento;\n" +
      "- Fornecer respostas adequadas e personalizadas;\n" +
      "- Atendimento e suporte técnico;\n" +
      "- Análise e melhoria dos serviços prestados.\n\n" +
      "3. **Compartilhamento de Dados**\n" +
      "A Head Systems não venderá, cederá ou compartilhará os dados coletados com terceiros sem o devido consentimento, salvo nos seguintes casos:\n" +
      "- Quando exigido por lei ou ordem judicial;\n" +
      "- Para cumprimento de obrigações legais e regulatórias;\n" +
      "- Com prestadores de serviço necessários para o funcionamento do chatbot, que também estarão sujeitos à LGPD.\n\n" +
      "4. **Armazenamento e Segurança**\n" +
      "Os dados serão armazenados de maneira segura, seguindo padrões adequados de proteção contra acessos não autorizados, vazamentos ou outros incidentes de segurança.\n\n" +
      "5. **Direitos do Usuário**\n" +
      "Nos termos da LGPD, o usuário tem direito a:\n" +
      "- Confirmar a existência de tratamento de dados pessoais;\n" +
      "- Acessar seus dados pessoais armazenados;\n" +
      "- Solicitar a correção de dados incompletos, inexatos ou desatualizados;\n" +
      "- Requerer a exclusão dos seus dados pessoais, salvo quando houver necessidade de retenção por motivos legais;\n" +
      "- Revogar este consentimento a qualquer momento.\n\n" +
      "Para exercer esses direitos, o usuário pode entrar em contato pelo e-mail [contato@headsystems.com.br].\n\n" +
      "6. **Consentimento**\n" +
      "Ao utilizar o chatbot da Head Systems, o usuário declara estar ciente e de acordo com os termos estabelecidos neste documento. Caso não concorde com o tratamento de seus dados, o usuário pode optar por não utilizar o serviço.\n\n" +
      "7. **Alterações no Termo de Consentimento**\n" +
      "A Head Systems reserva-se o direito de atualizar este termo sempre que necessário para manter a conformidade com a legislação vigente. O usuário será informado sobre alterações relevantes.\n\n" +
      "8. **Contato**\n" +
      "Para dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados pessoais, o usuário pode entrar em contato pelo e-mail [contato@headsystems.com.br].\n\n" +
      'Digite *"ACEITAR"* para concordar e continuar.',
    options: ["ACEITAR"],
  };

  static mainMenu = {
    message:
      "👋 *Bem-vindo(a) à Head Systems!* \n" +
      "*Soluções inovadoras em TI para transformar seu negócio!*\n\n" +
      "*Nossas Especialidades:*\n" +
      "▫️ Gestão Completa de TI\n" +
      "▫️ Virtualização de Servidores/Desktops\n" +
      "▫️ Segurança Cibernética\n" +
      "▫️ Gerenciamento de Dispositivos (MDM)\n" +
      "▫️ Infraestrutura em Nuvem\n\n" +
      "📌 *Como posso ajudar?*\n\n" +
      " 1️⃣ `Falar com especialista`- *Time Head*\n" +
      " 2️⃣ `Serviços`- *Conhecer detalhes*\n" +
      " 3️⃣ `FAQ`- *Tire dúvidas rápidas*\n" +
      " 4️⃣ `Agendar`- *Reunião técnica*\n" +
      " 5️⃣ `Sobre`- *Nossa história*\n" +
      " 6️⃣ `Contato`- *Canais diretos*\n" +
      " 7️⃣ `Sair`- *Encerrar atendimento*\n" +
      " 8️⃣ `Falar com a IA`- *Tirar dúvidas e simular orçamentos*\n\n" + // Nova opção 8
      "🔢 *Digite o número correspondente à opção desejada:*",

    options: ["1", "2", "3", "4", "5", "6", "7", "8"], // Adicionado "8" às opções
  };

  static servicesMenu = {
    message:
      "🏢 Aqui estão os principais serviços que a *Head Systems* oferece:\n\n" +
      "🔹 *Gestão Completa de TI*: Suporte técnico especializado e administração de infraestrutura de TI.\n" +
      "🔹 *Virtualização de Servidores e Desktops*: Soluções para otimização de recursos e redução de custos.\n" +
      "🔹 *Segurança da Informação*: Proteção de dados, backup gerenciado e conformidade com a LGPD.\n" +
      "🔹 *Gerenciamento de Dispositivos Móveis*: Monitoramento e controle de dispositivos corporativos.\n" +
      "🔹 *Cloud Computing*: Soluções em nuvem para escalabilidade e flexibilidade.\n" +
      "🔹 *Consultoria em TI*: Planejamento estratégico e implementação de soluções tecnológicas.\n" +
      "🔹 *Infraestrutura de Redes*: Projetos, implantação e manutenção de redes corporativas.\n\n" +
      "Digite *menu* para voltar ao início.",
    options: ["menu"],
  };

  static faqMenu = {
    message:
      "ℹ️ *Perguntas Frequentes (FAQ)*:\n\n" +
      "Como funciona o suporte de TI?\n" +
      "Quais benefícios das soluções de virtualização?\n" +
      "Como a Head Systems ajuda com a LGPD?\n" +
      "Digite *menu* para voltar ao início.\n" +
      "Para saber todas essas informações, acesse nosso site: https://headsystems.com.br\n\n",
    options: ["menu"],
  };

  static aboutUsMenu = {
    message:
      "📖 *Sobre Nós*:\n\n" +
      "A *Head Systems* é uma empresa especializada em soluções de TI, oferecendo serviços de outsourcing, virtualização, segurança da informação e desenvolvimento de software. Nossa missão é fornecer soluções tecnológicas inovadoras que atendam às necessidades dos nossos clientes.\n\n" +
      "Digite *menu* para voltar ao início.",
    options: ["menu"],
  };

  static contactMenu = {
    message:
      "📞 *Contato*:\n\n" +
      "📧 E-mail: contato@headsystems.com.br\n" +
      "📞 Telefone: (31) 3772-0172\n" +
      "🌐 Site: https://headsystems.com.br\n\n" +
      "Digite *menu* para voltar ao início.",
    options: ["menu"],
  };

  constructor() {
    this.state = "welcome"; // Estado inicial: mensagem de boas-vindas
    this.schedulingData = {};
    this.currentStep = 0;
    this.lastMeetingDetails = null;
    this.awaitingSpecialist = false;
    this.termsAccepted = false; // Flag de aceitação dos termos
    this.inactivityTimer = null; // Timer para verificar ociosidade
  }

  async processMessage(message) {
    if (!message || typeof message !== "string") {
      return {
        message: "❌ Mensagem inválida. Por favor, tente novamente.",
        complete: false,
      };
    }

    const text = message.toLowerCase().trim();

    // Reiniciar o timer de ociosidade
    this.resetInactivityTimer();

    // Handle global 'menu' command
    if (text === "menu") {
      this.resetState();
      return { message: SimpleAI.mainMenu.message, complete: false };
    }

    // Caso o usuário não envie texto válido
    if (!text)
      return { message: this.getCurrentStateMessage(), complete: false };

    // Fluxo principal
    switch (this.state) {
      case "welcome":
        return this.handleWelcomeFlow(text);
      case "terms":
        return this.handleLGPDTerms(text);
      case "main":
        return await this.handleMainFlow(text); // Adicionado await aqui
      case "scheduling":
        return this.handleSchedulingFlow(text);
      case "ia_interaction": // Novo estado para interação com a IA
        return await this.handleIAInteraction(text);
      default:
        return { message: "❌ Erro no fluxo. Digite *menu*.", complete: false };
    }
  }

  // ======================================
  // Fluxo de Boas-Vindas
  // ======================================
  handleWelcomeFlow(text) {
    if (text === "iniciar") {
      this.state = "terms";
      return {
        message: SimpleAI.lgpdTerms.message,
        complete: false,
      };
    } else {
      return {
        message:
          "👋 Olá! Eu sou o assistente virtual da *Head Systems*.\n\n" +
          'Antes de começarmos, digite *"iniciar"* para prosseguir.',
        complete: false,
      };
    }
  }

  // ======================================
  // Fluxo de Aceitação dos Termos LGPD
  handleLGPDTerms(text) {
    if (text === "aceitar") {
      this.termsAccepted = true;
      this.state = "main";
      return {
        message:
          "✅ Termos aceitos! Como posso ajudar?\n\n" +
          SimpleAI.mainMenu.message,
        complete: false,
      };
    } else {
      return {
        message:
          '❌ Você precisa aceitar os termos para continuar. Digite *"aceitar"*.',
        complete: false,
      };
    }
  }

  // ======================================
  // Fluxo Principal do Chatbot
  // ======================================
  async handleMainFlow(text) { // Adicionado async aqui
    if (text === "menu") {
      this.resetState();
      return { message: SimpleAI.mainMenu.message, complete: false };
    }

    switch (text) {
      case "1":
        this.awaitingSpecialist = true;
        return {
          message: "🔔 Buscando especialistas disponíveis...",
          complete: false,
        };
      case "2":
        this.state = "services";
        return { message: SimpleAI.servicesMenu.message, complete: false };
      case "3":
        this.state = "faq";
        return { message: SimpleAI.faqMenu.message, complete: false };
      case "4":
        this.state = "scheduling";
        this.currentStep = 1;
        return {
          message:
            "👤 Por favor, informe seu nome completo:\n\n Ou Digite *Menu* para voltar ao Menu Principal.",
          complete: false,
        };
      case "5":
        this.state = "about";
        return { message: SimpleAI.aboutUsMenu.message, complete: false };
      case "6":
        this.state = "contact";
        return { message: SimpleAI.contactMenu.message, complete: false };
      case "7":
        this.resetState();
        return {
          message: "👋 Atendimento encerrado. Volte sempre!",
          complete: false,
        };
      case "8": // Nova opção para falar com a IA
        this.state = "ia_interaction";
        return {
          message:
            "🤖 Você escolheu falar com a IA. Eu posso ajudar com dúvidas técnicas, simular orçamentos e muito mais!\n\n" +
            "Por favor, descreva sua dúvida ou solicitação:",
          complete: false,
        };
      default:
        return { message: SimpleAI.mainMenu.message, complete: false };
    }
  }

  // ======================================
  // Fluxo de Interação com a IA
  // ======================================
  async handleIAInteraction(text) {
    if (text === "menu") {
        this.resetState();
        return { message: SimpleAI.mainMenu.message, complete: false };
    }

    console.log("Prompt enviado para a IA:", text);

    const prompt = `Você é um assistente virtual da Head Systems, uma empresa especializada em soluções de TI. 
    Responda de forma clara e profissional. O cliente perguntou: "${text}". 
    Se for uma dúvida técnica, explique de forma simples. Se for uma solicitação de orçamento, peça mais detalhes para simular o orçamento.`;

    try {
        const generatedText = await AIService.generateText(prompt);
        console.log("Resposta gerada pela IA:", generatedText);
        return { message: generatedText, complete: false };
    } catch (error) {
        console.error("Erro ao gerar texto com IA:", error);
        return { message: "❌ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.", complete: false };
    }
}

  // ======================================
  // Fluxo de Agendamento
  // ======================================
  async handleSchedulingFlow(text) {
    switch (this.currentStep) {
      case 1: // Nome
        this.schedulingData.name = text;
        this.currentStep = 2;
        return { message: "📅 Informe a data (DD/MM/AAAA):", complete: false };

      case 2: // Data
        if (!this.isValidDate(text)) {
          return {
            message: "❌ Formato inválido. Use DD/MM/AAAA:",
            complete: false,
          };
        }
        this.schedulingData.date = text;
        this.currentStep = 3;
        return { message: "⏰ Informe o horário (HH:MM):", complete: false };

      case 3: // Horário
        if (!this.isValidTime(text)) {
          return {
            message: "❌ Horário inválido. Use HH:MM:",
            complete: false,
          };
        }
        this.schedulingData.time = text;
        this.currentStep = 4;
        return { message: "📧 Informe seu e-mail:", complete: false };

      case 4: // E-mail
        if (!this.isValidEmail(text)) {
          return {
            message: "❌ E-mail inválido. Tente novamente:",
            complete: false,
          };
        }
        this.schedulingData.email = text;
        this.currentStep = 5;
        return {
          message: "📝 Descreva o assunto da reunião:",
          complete: false,
        };

      case 5: // Confirmação
        this.schedulingData.subject = text;
        return this.confirmScheduling();

      default:
        this.resetState();
        return {
          message: "❌ Erro no agendamento. Digite *menu*.",
          complete: false,
        };
    }
  }

  async confirmScheduling() {
    try {
      await emailService.sendMeetingConfirmation(
        this.schedulingData,
        this.schedulingData.email
      );
    } catch (error) {
      console.error("Erro no envio do email:", error);
    }

    this.lastMeetingDetails = { ...this.schedulingData };
    this.resetState();

    return {
      message:
        "✅ Agendamento confirmado! Sua reunião foi marcada com sucesso e enviada para o Gestor de TI.",
      complete: true,
      meetingDetails: this.lastMeetingDetails,
    };
  }

  // ======================================
  // Utilitários
  // ======================================
  isValidDate(date) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  }

  isValidTime(time) {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  resetState() {
    this.state = "main";
    this.currentStep = 0;
    this.schedulingData = {};
    this.awaitingSpecialist = false;
    this.termsAccepted = false;
    this.clearInactivityTimer();
  }

  // ======================================
  // Timer de Ociosidade
  // ======================================
  resetInactivityTimer() {
    this.clearInactivityTimer();
    this.inactivityTimer = setTimeout(() => {
      this.resetState();
      console.log("⏰ Usuário ocioso por 30 minutos. Estado da conversa resetado.");
    }, 30 * 60 * 1000); // 30 minutos em milissegundos
  }

  clearInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
  }
}

export default SimpleAI;


