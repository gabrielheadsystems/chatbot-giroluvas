import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'querystring';

dotenv.config();

// Configuração do OAuth2
async function getAccessToken() {
    try {
        const response = await axios.post(
            `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
            qs.stringify({
                client_id: process.env.MICROSOFT_CLIENT_ID,
                client_secret: process.env.MICROSOFT_CLIENT_SECRET,
                refresh_token: process.env.MICROSOFT_REFRESH_TOKEN,
                grant_type: 'refresh_token',
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter Access Token:', error.response?.data || error.message);
        throw new Error('Falha ao obter Access Token');
    }
}

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "outlook.office365.com", // Alterado de smtp.office365.com
            port: 587,
            secure: false,
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.MICROSOFT_CLIENT_ID,
                clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
                tenantId: process.env.MICROSOFT_TENANT_ID, // Adicionar tenant ID
                refreshToken: process.env.MICROSOFT_REFRESH_TOKEN,
            }
        });
    }

    async sendMeetingConfirmation(meetingDetails, clientEmail) {
        const accessToken = await getAccessToken();

        this.transporter.set('oauth2_provision_cb', (user, renew, callback) => {
            let accessToken = userTokens[user];
            if (!accessToken) {
                return callback(new Error('Unknown user'));
            } else {
                return callback(null, accessToken);
            }
        });

        const emailBody = `
            <h2>Confirmação de Agendamento - Head Systems</h2>
            <p>Olá! Seu agendamento foi confirmado com sucesso.</p>
            <p><strong>Detalhes da Reunião:</strong></p>
            <ul>
                <li><strong>Data:</strong> ${meetingDetails.date}</li>
                <li><strong>Horário:</strong> ${meetingDetails.time}</li>
                <li><strong>Assunto:</strong> ${meetingDetails.subject}</li>
            </ul>
            <p>Em caso de dúvidas, entre em contato conosco:</p>
            <p>📞 (31) 3772-0172<br>
            📧 contato@headsystems.com.br</p>
        `;

        try {
            await this.transporter.sendMail({
                from: `Head Systems <${process.env.EMAIL_USER}>`,
                to: clientEmail,
                cc: process.env.EMAIL_CC,
                subject: 'Confirmação de Agendamento - Head Systems',
                html: emailBody,
            });
            console.log('Email enviado com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            return false;
        }
    }
}

export default new EmailService();
