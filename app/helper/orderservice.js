


exports.getOrder = async (order, res) =>{
  
  const data = order;  
  const returndata = [];
  if(!data){
    return {error: "data tidak ditemukan"};
  }
   
  //  numberPhone = nomor + "  "
  data.forEach(item => {
  const number = item.numberPhone +  "@c.us";
  const orders = item.order;

    if (!number || !Array.isArray(orders)) {
      return {error: "data undefined"};
    }
    if (!number || number == '' || number == null) {
      return {error: "Mohon mengisi nomor telepon"};
    }
    //declare var
  const itemList = orders.map((order, index) => {
  return `${index + 1}. ${order.menu} = ${order.quantity}`;
  }).join('\n'); // gabungkan jadi satu string dengan newline
    
const message = `
📦 *Konfirmasi Pesanan*
Hallo kak, terima kasih telah melakukan pemesanan. Berikut detail pesananmu:

${itemList}

✅ Mohon ditunggu, kami akan mengirimkan total tagihannya. Untuk bukti pembayaran bisa dilampirkan pada chat ini agar pesanan bisa diproses dan akan segera dikirim.
Terima kasih sudah berbelanja di toko kami 🙏
`; 

returndata.push({number, message});
    });
    return returndata;
}

