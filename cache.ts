
import memory_cache from "./cache/node-cache.js";
import heavy_cache from "./cache/memcached.js";
import Optional from "optional-js";
import { isAnyArrayBuffer } from "util/types";


declare module globalThis {
    let cache: ICache;
}
interface ICache {
    lazy:any;
    heavy:any;
}

export default class ManagerCache{
    
    lazy:any;
    heavy:any;

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
        this.heavy.set( key, value_save, { expires: ttl });
    }

    getHeavy( key ){
        return new Promise((resolve , reject)=>{
            this.heavy.get( key, function (err, data) {
                
                resolve( Optional.ofNullable( JSON.parse(data) ) );
                
            });
        })
    }

}



// Eu quero retornar 2 objectos de cache um para local dentro do node e outro para o memcache
