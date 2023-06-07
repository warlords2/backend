
let memory_cache = require("./cache/node_cache.js");
let heavy_cache = require("./cache/redis.js");
let Optional = require("optional-js");


class ManagerCache{
    
    lazy;
    heavy;

    constructor(){
        
        // Skeleton
        if(typeof globalThis.cache == 'undefined'){
            globalThis.cache = {
                lazy: memory_cache(),
                heavy: heavy_cache()
            };
        }

        this.lazy = globalThis.cache.lazy;
        this.heavy = globalThis.cache.heavy;

    }

    setLazy( key , value, ttl = 1800){
        return this.lazy.set( key, value, ttl );
    }

    setLazyAll( data ){
        return this.lazy.mset(data);
    }

    getLazy( key ){
        return new Promise((resolve, reject)=>{
            resolve( Optional.ofNullable( this.lazy.get( key ) ) );
        })
    }

    setHeavy(key , value, ttl = 3600){
        let value_save = JSON.stringify(value);
        //setex(key, 60, value)
        this.heavy.set( key, ttl , value_save);
    }

    getHeavy( key ){
        return new Promise((resolve , reject)=>{
            this.heavy.get( key, function (err, data) {
                
                resolve( Optional.ofNullable( JSON.parse(data) ) );
                
            });
        })
    }

}

module.exports = ManagerCache

// Eu quero retornar 2 objectos de cache um para local dentro do node e outro para o memcache
