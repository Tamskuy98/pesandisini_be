const { getOrder } = require('../helper/orderservice.js');
const { getClient } = require('../helper/auth.js');


exports.userorder = async (req, res)=>{
let _err = [];

const client = getClient();

const data = req.body?.data;
if(!data || data == null){
  return res.status(400).json({succes: true, message: "Bad Request", data: _err});
}
if(typeof data !== 'object'){
  return res.status(400).json({success: false, message: "Bad Request", data: _err});
  }
if(!Array.isArray(data)){
  return res.status(400).json({succes: true, message: "Bad Request", data: _err});
}

const result = await getOrder(data);
const {number, message} = result[0];
const isRegistered = await client.isRegisteredUser(number);
if (!isRegistered) {
  return res.status(400).json({succes: true, message: "Number not registered", data: _err});
}
if (!message || message === '') {
  return res.status(400).json({succes: true, message: "Message undefined", data: _err});
}
try {
  // const messagex = "ini pesanan nya";
  await client.sendMessage(number, message);
  return res.status(200).json({ success: true, message: 'Succes sent to Whatsapp' });
} catch (error) {
  console.error(_err , error);
  return res.status(500).json({ success: false, message: 'Error sent to Whatsapp', error: error.message });
}
}



