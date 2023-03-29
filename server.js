let fs =   require('fs-extra');
let path = require('path');

const COMPRESS = process.env.COMPRESS === "1";
const PORT = process.env.PORT || 3000;

const uWS = require("uWebSockets.js");
// Listener middleware
const listRoutes = {"get":[],"post":[],"put":[],"delete":[]};

let StarServer = async () => {

  let server = uWS./*SSL*/App({

    /* There are more SSL options, cut for brevity 
    key_file_name: 'key.pem',
    cert_file_name: 'cert.pem',*/
    
  }).ws('/*', {

    /* There are many common helper features */
    idleTimeout: 32,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    compression: uWS.DEDICATED_COMPRESSOR_3KB,

  }).any('/*', async (res, req) => {
    
    res.json = (json) => {
      res.writeHeader('content-type', 'text/json')
      res.end(JSON.stringify(json));
    }
    res.send = (text) => {
      res.writeHeader('content-type','text/plain');
      res.end( text );
    }
    res.status = (status) => {
      return res.writeStatus(status);
    }
    let func = listRoutes[req.getMethod()][req.getUrl()];
    
    try {
      return await func(res, req);
    } catch (error) {
      if(typeof func == 'undefined')return res.writeStatus('404').end('NotFound');
      else return res.writeStatus('500').end('Internal Server Error');
    }
    
    //console.log(req.getMethod());
    ///console.log(req.getUrl());

    
  }).listen( PORT, (listenSocket) => {
  
    if (listenSocket) {
      console.log('Listening to port '+ PORT);
    }
    
  });

  // order method(size group 4) --> path(size group 0...)
  let router = {
    "get":( path, func )=>{
      if( typeof func == 'function' )listRoutes["get"][path] = func;
      else if(typeof func == 'object'){
        // validade guard's e etc
      }
    },
    "post":( path, func )=>{
      if( typeof func == 'function' )listRoutes["post"][path] = func;
      else if(typeof func == 'object'){
        // validade guard's e etc
      }
    },
    "put":( path, func )=>{
      if( typeof func == 'function' )listRoutes["put"][path] = func;
      else if(typeof func == 'object'){
        // validade guard's e etc
      }
    },
    "delete":( path, func )=>{
      if( typeof func == 'function' )listRoutes["delete"][path] = func;
      else if(typeof func == 'object'){
        // validade guard's e etc
      }
    }
  }

  let dir_contollers = path.join(__dirname,'controller') // dir controllers

  fs.readdirSync( dir_contollers ).forEach( controllerName => {
    var controller = path.join(dir_contollers, controllerName);
    
    if((controller).slice(-3) == ".js"){
      try{ require(controller)(router) }
      catch(err){
        // send arquive erro process
      }
    }
    // O requisita, e já envia um novo express.Router
    //require(controller)(middleware);

  });
  
  return server;
}


module.exports = StarServer;