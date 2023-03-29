let dotenv = require('dotenv');

dotenv.config({path:'./.env'});

// Cache  Config
let ManagerCache = require('./cache.js');
const cache = new ManagerCache();
globalThis.mncache = cache;

// DataBase Config
let ManagerDatabase =  require('@warlords/storage').ManagerDatabase;
const database = new ManagerDatabase();
globalThis.mndatabase = database;

// WebSocket config 
let ServerBuilder  = require('./server.js');
const server = ServerBuilder();

