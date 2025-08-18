
const { auth } = require('./app/helper/auth.js');
const express = require("express");
const app = express();


const controllerservicewa = require ("./app/controller/sendtowatshapp.js");

app.use(express.json());

app.post('/sendwa', controllerservicewa.userorder);

const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await auth(); // ✅ auth hanya dijalankan sekali di awal
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Gagal autentikasi WhatsApp:', error);
  }
});