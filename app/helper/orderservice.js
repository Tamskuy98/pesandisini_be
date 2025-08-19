const { getClient } = require('../helper/auth.js');


exports.getOrder = async (data, res) =>{
  
  const client = getClient();
  
  // validasi number
  const unnumberd = data[0].numberPhone.replace(/\D/g, '');
  if(!unnumberd || unnumberd == ""){
    return {error: "Nomor telepon wajib di isi"};
  }
  if (!/^62\d{8,13}$/.test(unnumberd)){
    return {error: "Nomor telepon tidak valid"};
  }
  
  const number = unnumberd +  "@c.us";
  
  const isRegistered = await client.isRegisteredUser(number);
  if (!isRegistered) {
  return {error: "Nomor Whatsapp tidak terdaftar"};
 }
  
  //validasi massage
  const orderlist = data[1].order;
  if(!orderlist || orderlist == null){
    return {error: "Data order tidak ditemukan"};
  }
  if(!orderlist || orderlist == null){
    return {error: "Data order tidak ditemukan"};
  }
  if(!Array.isArray(orderlist)){
    return {error: "Data order tidak valid"};
  }
  const itemList = orderlist.map((order, index) => {
  return `${index + 1}. ${order.menu} = ${order.quantity}`;
  }).join('\n'); 
    
  const message = `
📦 *Konfirmasi Pesanan*
Hallo kak, terima kasih telah melakukan pemesanan. Berikut detail pesananmu:

${itemList}

✅ Mohon ditunggu, kami akan mengirimkan total tagihannya. Untuk bukti pembayaran bisa dilampirkan pada chat ini agar pesanan bisa diproses dan akan segera dikirim.
Terima kasih sudah berbelanja di toko kami 🙏
`;

//send to whatsapp
try {
  await client.sendMessage(number, message);
  return  {success: "Data Pesanan telah dikirim ke whatsapp"};
} catch (error) {
  console.error(_err , error);
  return  {errpr: "Data Pesanan gagal terkirim ke whatsapp"};
}
}

