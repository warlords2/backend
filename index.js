let dotenv = require('dotenv');

dotenv.config({path:'./.env'});

// Cache  Config
let ManagerCache = require('./cache.js');
const cache = new ManagerCache();
globalThis.manager_cache = cache;

// DataBase Config
let ManagerDatabase =  require('@warlords/storage').ManagerDatabase;
const database = new ManagerDatabase();
globalThis.manager_database = database;

let ManagerToken = require('./util/token.js');
globalThis.manager_token = ManagerToken;

let ManagerCript = require('./util/cript.js');
globalThis.manager_cript = ManagerCript;

// WebSocket config 
let ServerBuilder  = require('./server.js');
const server = ServerBuilder();

