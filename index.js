const port = 4001;
const express= require ("express");
const cors = require("cors");
const app = express();
var escapeHtml = require("escape-html");
const welcome = require("./controllers/api/welcome");
let { SmartAPI, WebSocket,WebSocketV2 } = require('smartapi-javascript');
var axios = require('axios');
require('dotenv').config();


app.use(express.json()); 
app.use(cors({ credentials: true })); //abiding by cors policy

//logging in
var data = JSON.stringify({
    "clientcode":process.env.clientcode,
    "password":process.env.password,
	"totp":process.env.totp
});

var config = {
  method: 'post',
  url: `https://apiconnect.angelbroking.com/
    /rest/auth/angelbroking/user/
  v1/loginByPassword`,

  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-ClientLocalIP': process.env.localip,
    'X-ClientPublicIP': process.env.publicip,
    'X-MACAddress': process.env.macaddress,
    'X-PrivateKey': process.env.apikey
  },
  data : data
};

const logindata= axios(config)
.then(function (response) {
  console.log("----->",JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

//generate token
const REFRESH_TOKEN=logindata.refreshToken;
var token = {
	method: 'post',
	url: `https://apiconnect.angelbroking.com/
	rest/auth/angelbroking/jwt/
	v1/generateTokens`,
  
	headers: {
	  'Authorization': 'Bearer AUTHORIZATION_TOKEN',
	  'Content-Type': 'application/json',
	  'Accept': 'application/json',
	  'X-UserType': 'USER',
	  'X-SourceID': 'WEB',
	  'X-ClientLocalIP': process.env.localip,
    'X-ClientPublicIP': process.env.publicip,
    'X-MACAddress': process.env.macaddress,
    'X-PrivateKey': process.env.apikey
	},
	data : data
  };
  
  const tokendata = axios(token)
  .then(function (response) {
	console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
	console.log(error);
  });


let smart_api = new SmartAPI({
	api_key: process.env.apikey,
	access_token: process.env.YOUR_ACCESS_TOKEN,
	refresh_token: REFRESH_TOKEN
});

smart_api
	.generateSession(process.env.clientcode, process.env.password, process.env.totp)
	.then((data) => {
		// Profile details
		console.log(data);
	})
	.catch((ex) => {
		//Log error
});
	


app.use("/", welcome);

app.listen(port, () => {
    console.log("Server started at port ", port);
});
