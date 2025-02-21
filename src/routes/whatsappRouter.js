import express from 'express';
import { getQRCode } from '../services/whatsapp/connection.js';
import qr from 'qr-image';

const router = express.Router();

router.get('/qr', (req, res) => {
    const qrCode = getQRCode();
    
    if (!qrCode) {
        return res.status(404).json({ message: 'QR Code ainda não está disponível' });
    }

    const qr_png = qr.image(qrCode, { type: 'png' });
    res.setHeader('Content-Type', 'image/png');
    qr_png.pipe(res);
});

export default router; 