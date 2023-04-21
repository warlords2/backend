import dotenv from 'dotenv';
dotenv.config({path:'../.env'});

import ManagerCache from '../cache.bun.js';

const cache = new ManagerCache();

cache.setLazy('gil',3);

let res = await cache.getLazy('gil');

console.log(res.isPresent());
console.log(res.get());

cache.setHeavy('gil', {"oi":23,src:{src:{tt:23}}});

res = await cache.getHeavy('gil');

console.log(res.isPresent());
console.log(res.get());

res = await cache.getHeavy('claudio');

console.log(res.isPresent());
console.log(res.get());