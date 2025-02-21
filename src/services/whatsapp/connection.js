import { create } from 'venom-bot';
import SimpleAI from '../ai/simpleai.js';

const ADMIN_NUMBER = '5531991855597@c.us';
let qrCodeData = null;

const specialistNumbers = [
    '5531999407159',
    '5531987952799',
    '5531994344898',
    '5531989657822'
];

// Objeto para armazenar o estado de cada conversa
const conversationState = {};

create({
    session: 'head-systems-bot',
    multidevice: true,
    headless: 'new',
    logQR: true,
    puppeteerOptions: {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    catchQR: (base64Qr) => {
        qrCodeData = base64Qr;
    },
})
    .then((client) => {
        console.log('🚀 Bot iniciado com sucesso!');

        client.onMessage(async (message) => {
            if (!message.isGroupMsg) {
                try {
                    // Skip messages from specialists completely
                    if (specialistNumbers.includes(message.from.replace('@c.us', ''))) {
                        return;
                    }

                    if (!message.body || typeof message.body !== 'string') {
                        console.log('❌ Mensagem inválida recebida');
                        return;
                    }

                    console.log(`📩 Mensagem recebida de cliente: ${message.body}`);
                    const userInput = message.body.trim();

                    if (!userInput) {
                        console.log('❌ Mensagem vazia recebida');
                        return;
                    }

                    // Inicializa o estado da conversa se não existir
                    if (!conversationState[message.from]) {
                        conversationState[message.from] = {
                            aiInstance: new SimpleAI(),
                        };
                    }

                    const response = await conversationState[message.from].aiInstance.processMessage(userInput);

                    if (conversationState[message.from].aiInstance.awaitingSpecialist) {
                        await handleSpecialistSearch(client, message);
                        conversationState[message.from].aiInstance.awaitingSpecialist = false; // Reiniciar o estado
                        return;
                    }

                    // Update admin notification message
                    if (response.complete && response.meetingDetails) {
                        await client.sendText(message.from, response.message);
                        await client.sendText(
                            ADMIN_NUMBER,
                            `📅 Novo agendamento de reunião:\n\n` +
                            `👤 Nome: ${response.meetingDetails.name}\n` +
                            `📆 Data: ${response.meetingDetails.date}\n` +
                            `⏰ Hora: ${response.meetingDetails.time}\n` +
                            `📧 E-mail: ${response.meetingDetails.email}\n` +
                            `📝 Assunto: ${response.meetingDetails.subject}\n` +
                            `📞 Número do cliente: ${message.from.replace('@c.us', '')}`
                        );
                    } else {
                        await client.sendText(message.from, response.message);
                    }
                } catch (error) {
                    console.error('❌ Erro ao processar mensagem:', error);
                    await client.sendText(
                        message.from,
                        '⚠️ Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
                    );
                }
            }
        });
    })
    .catch((error) => {
        console.error('❌ Erro ao criar cliente:', error);
    });

const handleSpecialistSearch = async (client, message) => {
    try {
        const specialists = [
            { name: 'Gabriel', number: '5531999407159' },
            { name: 'Rafael', number: '5531987952799' },
            { name: 'Bruno', number: '5531994344898' },
            { name: 'Vitor', number: '5531989657822' },
        ].filter(spec => spec.number !== message.from.replace('@c.us', ''));

        const clientNumber = message.from.replace('@c.us', '');

        // Notify client
        await client.sendText(
            message.from,
            "✅ Notificamos nossos especialistas sobre seu contato.\n" +
            "Em breve, um deles entrará em contato com você.\n\n" +
            "Enquanto isso, você pode:\n" +
            "Aguardar o retorno\n" +
            "Agendar uma reunião (digite *4*)\n" +
            "Se você já é nosso cliente, também pode abrir um chamado enquanto aguarda o especialista:(https://helpdesk.headsystems.com.br:444/)"
        );
        

        // Notify all specialists
        for (const specialist of specialists) {
            await client.sendText(
                `${specialist.number}@c.us`,
                `🔔 *Novo cliente aguardando atendimento*\n\n` +
                `📱 Número do cliente: wa.me/${clientNumber}\n\n` +
                `Entre em contato assim que possível.`
            );
        }

        return true;

    } catch (error) {
        console.error("❌ Erro ao notificar especialistas:", error);
        await client.sendText(
            message.from,
            "❌ Erro ao processar sua solicitação. Por favor, tente novamente mais tarde."
        );
        return false;
    }
};

export const getQRCode = () => qrCodeData;