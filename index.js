let dotenv = require('dotenv');

dotenv.config({path:'./.env'});

// Manager Cache and Database
let ManagerCache = require('./cache.js');
let { ManagerDatabase } =  require('@warlords/storage');

globalThis.manager = {
    cache: new ManagerCache(),
    database: new ManagerDatabase(),
}
globalThis.manager.database.getConnection();

// Util token valid and cript
let ManagerToken = require('./util/token.js');
let ManagerCript = require('./util/cript.js');

globalThis.util = {
    token:ManagerToken,
    cript:ManagerCript
}

// WebSocket config 
let ServerBuilder  = require('./server.js');
const server = ServerBuilder();



