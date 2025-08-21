

const { auth } = require('./app/helper/auth.js');
// const { authwithenv } = require('./app/helper/authwithenv.js');
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());


const controllerservicewa = require ("./app/controller/sendtowatshapp.js");
const helper = require ("./app/helper/auth.js");

app.use(express.json());

app.post('/sendwa', controllerservicewa.userorder);
app.get('/crtbarcode', controllerservicewa.generatebarcode);

const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
  try {

    await auth();
    
    // console.log(`client aktif`);
    // console.log(`🚀 Server berjalan di PORT ${PORT}`);
    
  } catch (error) {
    console.error('❌ Gagal autentikasi WhatsApp:', error);
  }
});