const { getBarcode } = require('../helper/auth.js');
const qrcode = require('qrcode');
const getOrder = require('../helper/orderservice.js');


exports.userorder = async (req, res)=>{
const _err = [];
const data = req.body.data;

if(!data || data == null){
  if (typeof data !== 'object'){
    if(!Array.isArray(data)){
      return res.status(400).json({succes: true, message: "Bad Request", data: _err});
    }
      return res.status(400).json({succes: true, message: "Bad Request", data: _err});
  }
  return res.status(400).json({succes: true, message: "Bad Request", data: _err}); 
}

const result = await getOrder(data);
// console.log(` ini nmr setelah getOrder ${result.number}`);
if(result.error) {
   return res.status(400).json({succes: true, message: result.error, data:null});
}
if(result.success) {
   return res.status(400).json({succes: true, message: result.success, data:result});
}
}


exports.generatebarcode = async (req, res)=> {

 const barcode = getBarcode();
    try {
         const qrPng = await qrcode.toBuffer(barcode, { type: "png" });
        res.type("png");
        res.send(qrPng);
        
    } catch (err) {
        console.error("Error generating QR:", err);
        res.status(500).send("Error generating QR");
    }
}



