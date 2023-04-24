'use strict'

class ServiceError extends Error {
    constructor(message, code) {
      super(message);
      
      this.name = this.constructor.name;
      this.code = code;
      
      Error.captureStackTrace(this, this.constructor);
    }

    getMenssage(){
      return this.message;
    }
    toString(){
      return this.name.toLowerCase();
    }
}

module.exports = { ServiceError };