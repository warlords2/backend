let fs =   require('fs-extra');
let path = require('path');

const COMPRESS = process.env.COMPRESS === "1";
const PORT_ENV = process.env.PORT || process.env.BACKEND_PORT || 3000;


const handler_controller = require('./errors/controller.handler');
const handler_service  = require('./errors/service.handler');

const { ControllerError } = require('./errors/model/controller.error');
const { ServiceError } = require('./errors/model/service.error');

const uWS = require("uWebSockets.js");

let StarServer = async (PORT = PORT_ENV) => {

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
    
//    console.log(req.getMethod());
//    console.log(req.getUrl());

    
  }).listen( PORT, (listenSocket) => {

    if (listenSocket) {
      console.log('Listening to port '+ PORT);
    }

  });

  // Middleware 
  let registerRoute = ( method, path, func ) => {
    
    server[method]( path, async (res, req) => {

      res.json = (json) => {
        res.writeHeader('content-type', 'text/json')
        res.end(JSON.stringify(json));
      }
      res.send = (text) => {
        res.writeHeader('content-type','text/plain');
        res.end( text );
      }
      // Status
      res.status = (status) => {
        return res.writeStatus(status);
      }
      res.ok = () => {
        return res.writeStatus('200');
      }
      res.badrequest = () => {
        return res.writeStatus('400');
      }
      res.unauthorized = () => {
        return res.writeStatus('401');
      }
      res.created = () => {
        return res.writeStatus('201');
      }
      // REQ
      req.readJson = () => {
        return readJson(res);
      }
      req.authenticad = async () => {
  
        let jwt = (req.header['authorization']+"").trim();
        
        if( jwt ) return false;
        
        jwt = jwt.split(" ")[1];
        
        let is_valid = await globalThis.util.token.valid(jwt);
  
        if( !is_valid ) return false;
        
        let jwtdata =  await globalThis.util.token.getDataFromToken(jwt);
  
        if( !jwtdata.identifier && !jwtdata.id )return false;

        return {
          identifier: jwtdata.identifier,
          id: jwtdata.id,
        }
      }
      req.url = req.getUrl();
      req.method = req.getMethod();
      req.header = {};
      req.forEach((key, value) => {
        req.header[key] = value;
      });

      try {

        func(res, req).catch((err)=>{          
          //    ASYNC METHOD
          console.log(err)
          if( err instanceof ControllerError ){
            console.log("CCCCCCC")
            handler_controller(err, res, req);

          // Service's hook and logs
          }else if( err instanceof ServiceError ){
            console.log("SSSSSSS")
            handler_service(err, res, req);
    
          }else res.status('500').end('Internal Server Error');

        });

      } catch ( err ) {
        //    SYNC METHOD

        if(typeof func == 'undefined'){
  
          return res.writeStatus('404').end('NotFound');
        // Controller's hook and logs
        }else if( err instanceof ControllerError ){
          console.log("CCCCCCC")
          handler_controller(err, res, req);
        // Service's hook and logs
        }else if( err instanceof ServiceError ){
          console.log("SSSSSSS")
          handler_service(err, res, req);
  
        }else return res.writeStatus('500').end('Internal Server Error');


      }

    });

  };
  // order method(size group 4) --> path(size group 0...)
  let router = {
    "get":( paths, func )=>{
      if( typeof func == 'function' ){
        if( typeof paths == 'string' ){
          registerRoute('get', paths, func);
        }else for(let path of paths){
          registerRoute('get', path, func);
        }

      } else if(typeof func == 'object'){
        // validade guard's e etc
      }
    },
    "post":( paths, func )=>{
      if( typeof func == 'function' ){
        
        if( typeof paths == 'string' ){
          registerRoute('post', paths, func);
        }else for(let path of paths){
          registerRoute('post', path, func);
        }
        
      }else if(typeof func == 'object'){
        // validade guard's e etc
      }
    },
    "put":( paths, func )=>{
      if( typeof func == 'function' ){

        if( typeof paths == 'string' ){
          registerRoute('put', paths, func);
        }else for(let path of paths){
          registerRoute('put', path, func);
        }

      }
      else if(typeof func == 'object'){
        // validade guard's e etc
      }
    },
    "delete":( paths, func )=>{
      if( typeof func == 'function' ){

        if( typeof paths == 'string' ){
          registerRoute('delete', path, func);
        }else for(let path of paths){
          registerRoute('delete', path, func);
        }

      } else if(typeof func == 'object'){
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
        console.error(err)
      }
    }
    // O requisita, e já envia um novo express.Router
    //require(controller)(middleware);

  });
  
  return server;
}


function readJson(res) {
  return new Promise((resolve,reject)=>{

    let buffer;
    /* Register data cb */
    res.onData((ab, isLast) => {
      let chunk = Buffer.from(ab);
      if (isLast) {
        let json;
        if (buffer) {
          try {
            json = JSON.parse(Buffer.concat([buffer, chunk]));
          } catch (e) {
            /* res.close calls onAborted */
            res.close();
            return;
          }
          resolve(json);
        } else {
          try {
            json = JSON.parse(chunk);
          } catch (e) {
            /* res.close calls onAborted */
            res.close();
            return;
          }
          resolve(json);
        }
      } else {
        if (buffer) {
          buffer = Buffer.concat([buffer, chunk]);
        } else {
          buffer = Buffer.concat([chunk]);
        }
      }
    });
    /* Register error cb */
    res.onAborted(reject);

  })
  
}

module.exports = StarServer;