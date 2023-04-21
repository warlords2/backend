
const NodeCache = require("node-cache");


const MAX_TIME_TO_LIVE = 60 * 15;// 15m => 60 *15
const MAX_TIME_LOOP_CHECK = 60 * 8; // 8m => 60 * 8

const config_memory_cache = { stdTTL: MAX_TIME_TO_LIVE , // tempo geral para a exclusao
                              deleteOnExpire: true, // define que as variaveis excluidas seram diretamente removidas
                              checkperiod: MAX_TIME_LOOP_CHECK, // periodo em segundos que o ssitema verifica se uma variavel chegou ao tempo de vida maximo e deve ser excluida
                              useClones: false // melhor desempenho, sem cone {... obj }
                           };


module.exports = function(){
   const memory_cache = new NodeCache(config_memory_cache);
   return memory_cache;
}
