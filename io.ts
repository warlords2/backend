
export default {

    open(ws) {
        ws.subscribe("room");
  
        console.log(`${ws.data.name} connected `);
  
      },
      message(ws, msg) {
        const out = `${ws.data.name}: ${msg}`;
        if (ws.publishText("room", out) !== out.length) {
          throw new Error("Failed to publish message");
        }
      },
      close(ws) {
        
      },
  
      perMessageDeflate: false,


}