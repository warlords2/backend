const memjs = require("memjs");


/*
const RETRY_TIME_CONECTION =  1000 * 2; // 2s => 1000 mili * 2
const IDLE_TIME = 1000 * 8; // o tempo limite ocioso para as conexões.
const MAX_RETRIES = 10;//  o número de novas tentativas de alocação de soquete por solicitação

const config_heavy_cache = { 
                        maxExpiration: MAX_TIME_TO_LIVE,
                        reconnect: RETRY_TIME_CONECTION,
                        retries: MAX_RETRIES,
                        idle: IDLE_TIME
                    };
*/



module.exports = function(){
    var heavy_cache = memjs.Client.create();
    return heavy_cache;
    /*var heavy_cache = new Memcached([host], config_heavy_cache);
    heavy_cache.on('failure', function( details ){ sys.error( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
    heavy_cache.on('reconnecting', function( details ){ sys.debug( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});
    heavy_cache.connect( host, function( err, conn ){
        if( err ) throw new Error( err );
        console.log( conn.server );
      });
    return heavy_cache;*/
}