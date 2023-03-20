const COMPRESS = process.env.COMPRESS === "1";
const PORT = process.env.PORT || 3000;

import io from './io.js';

const server = () => Bun.serve({
    port: PORT,
    websocket:io,
    fetch(req, server){
        if (
            server.upgrade(req, {
              data: {
                name:
                  new URL(req.url).searchParams.get("name") ||
                  "Client # 01" ,
              },
            })
          )
            return;
      
          return new Response("Error");
    },
})


export default server;