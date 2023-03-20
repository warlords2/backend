import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

import ManagerCache from './cache.js';

// Cache  Config
const cache = new ManagerCache();
globalThis.mncache = cache;

// DataBase Config


// WebSocket config 
import ServerBuilder from './server.js';
const server = ServerBuilder();

