import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import axios from 'axios';
import qs from 'querystring';
import { promises as fs } from 'fs';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = 3003;

// Configuração da session middleware
app.use(
    session({
        secret: 'sua_chave_secreta_aqui', // Altere para uma chave forte
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Em produção, use secure: true com HTTPS
    })
);

// URLs for Microsoft OAuth2
const AUTH_URL = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`;
const TOKEN_URL = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`;

// Generate PKCE Challenge
function generateCodeVerifier() {
    return crypto.randomBytes(32).toString('base64url');
}

function generateCodeChallenge(verifier) {
    return crypto
        .createHash('sha256')
        .update(verifier)
        .digest('base64url');
}

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Erro interno do servidor');
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Microsoft OAuth2 Authentication</h1>
        <p>Click below to start authentication:</p>
        <a href="/auth" style="padding: 10px; background: #0078d4; color: white; text-decoration: none;">Start Auth</a>
    `);
});

app.get('/auth', (req, res) => {
    try {
        // Gerar os valores PKCE e salvar na sessão do usuário
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = generateCodeChallenge(codeVerifier);
        req.session.codeVerifier = codeVerifier;

        const params = new URLSearchParams({
            client_id: process.env.MICROSOFT_CLIENT_ID,
            response_type: 'code',
            redirect_uri: `http://localhost:${PORT}/callback`,
            response_mode: 'query',
            scope: 'offline_access https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Mail.ReadWrite',
            prompt: 'consent',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256'
        });

        const authUrl = `${AUTH_URL}?${params.toString()}`;
        console.log('Redirect URL:', authUrl);
        res.redirect(authUrl);
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(500).send('Erro na autenticação');
    }
});

app.get('/callback', async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).send('Código não encontrado');
        }

        // Recupera o codeVerifier da sessão
        const codeVerifier = req.session.codeVerifier;
        if (!codeVerifier) {
            return res.status(400).send('Verificador de código não encontrado na sessão');
        }

        const tokenResponse = await axios.post(
            TOKEN_URL,
            qs.stringify({
                client_id: process.env.MICROSOFT_CLIENT_ID,
                client_secret: process.env.MICROSOFT_CLIENT_SECRET,
                code: code,
                redirect_uri: `http://localhost:${PORT}/callback`,
                grant_type: 'authorization_code',
                code_verifier: codeVerifier
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { access_token, refresh_token } = tokenResponse.data;
        // Opcional: salvar os tokens no .env ou em outro storage
        const envPath = '.env';
        let envContent = await fs.readFile(envPath, 'utf8');
        envContent = envContent
          .replace(/MICROSOFT_ACCESS_TOKEN=.*/, `MICROSOFT_ACCESS_TOKEN=${access_token}`)
          .replace(/MICROSOFT_REFRESH_TOKEN=.*/, `MICROSOFT_REFRESH_TOKEN=${refresh_token}`);
        await fs.writeFile(envPath, envContent);

        // Em produção não exiba os tokens; redirecione para uma página de sucesso
        res.send(`
            <h1>Autenticação concluída!</h1>
            <p>Os tokens foram armazenados com segurança.</p>
            <p>Você pode fechar esta janela.</p>
        `);
    } catch (error) {
        console.error('Callback Error:', error.response?.data || error);
        res.status(500).send('Erro ao processar callback');
    }
});

app.listen(PORT, () => {
    console.clear();
    console.log(`\nServidor rodando em http://localhost:${PORT}`);
});
