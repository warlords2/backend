const express = require('express');

let fs =   require('fs-extra');
let path = require('path');

const COMPRESS = process.env.COMPRESS === "1";
const PORT_ENV = process.env.PORT || process.env.BACKEND_PORT || 3000;
const app = express();


const handler_controller = require('./errors/controller.handler');
const handler_service  = require('./errors/service.handler');

const { ControllerError } = require('./errors/model/controller.error');
const { ServiceError } = require('./errors/model/service.error');


let StarServer = async (PORT = PORT_ENV) => {

  app.use(express.json());

  
  app.listen(PORT, () => {

    console.log('LISTEN '+PORT);

  });

  // Middleware 
  let registerRoute = ( method, path, func ) => {

    app[method]( path, async (req, res) => {
      
          // Status
          res.ok = () => {
            res.status(200);
            return res;
          }
          res.badrequest = () => {
            res.status(400);
            return res;
          }
          res.unauthorized = () => {
            res.status(401);
            return res;
          }
          res.created = () => {
            res.status(201);
            return res;
          }
          // REQ
          req.readJson = () => {
            return req.body;
          }
          req.authenticad = async () => {

            let jwt = (req.headers['authorization']+"").trim();

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

          req.url = req.originalUrl;
/*          req.method = req.getMethod();
          req.header = {};
          req.headers.forEach((key, value) => {
            req.header[key] = value;
          });
*/
          
          try {

            func(req, res).catch((err)=>{          
              //    ASYNC METHOD
              console.log(err)
              if( err instanceof ControllerError ){
                handler_controller(err, req, res);
              // Service's hook and logs
              } else if( err instanceof ServiceError ){
                handler_service(err, req, res);
              } else { 
                res.status(500);
                res.send('Internal Server Error'); 
              }

            });

          } catch ( err ) {
            //    SYNC METHOD

            if(typeof func == 'undefined'){
      
              return res.writeStatus('404').end('NotFound');
            // Controller's hook and logs
            }else if( err instanceof ControllerError ){
              handler_controller(err, req, res);
            // Service's hook and logs
            }else if( err instanceof ServiceError ){
              handler_service(err, req, res);
            } else { 
              res.status(500);
              res.send('Internal Server Error'); 
            }
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
  });
  
  return app;
}

module.exports = StarServer;
