const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let client = null;
let isAuthenticated = false;

const auth = () => {
  return new Promise((resolve, reject) => {
    if (client && isAuthenticated) {
      return resolve({ status: true, client });
    }

    client = new Client({
      authStrategy: new LocalAuth()
    });

    client.on('qr', (qr) => {
      console.log('🔒 QR Code perlu discan:');
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
      console.log('✅ Client siap digunakan!');
      isAuthenticated = true;
      resolve({ status: true, client });
    });

    client.on('auth_failure', (msg) => {
      console.error('❌ Autentikasi gagal:', msg);
      isAuthenticated = false;
      reject({ status: false, error: msg });
    });

    client.on('disconnected', (reason) => {
      console.log('🔌 Client terputus:', reason);
      isAuthenticated = false;
    });

    client.initialize();
  });
};

const getClient = () => {
  if (!isAuthenticated || !client) {
    throw new Error('Client belum terautentikasi');
  }
  return client;
};

module.exports = { auth, getClient };
