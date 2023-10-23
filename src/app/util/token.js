const JWS = require('node-jws')['default'];
const { JWTAlghoritm } = require('node-jws');
const FileProvider = require('node-jws-file-provider')['default'];

const provider = FileProvider('./private-key.pem', './public-key.pem');
const token_ttl = (60*60/* 1h*/) || process.env.TOKEN_TTL;

let tokenDefault = new JWS(provider);
tokenDefault.useAlghoritm(JWTAlghoritm.RS512);

module.exports = {

    create: async ( data , ttl = token_ttl) => {
        tokenDefault.setClaims(data)
        tokenDefault.notValidBefore(new Date()).expiresIn(ttl);
        return tokenDefault.sign().then(async (re)=>{
            return tokenDefault.toString();
        })
    },

    valid: async ( text ) => {
        let jws = JWS.fromString(text, provider);
        let isValid = await jws.valid() && !jws.isExpired();
        return isValid;
    },

    getDataFromToken: async ( text ) => {
        let jws = JWS.fromString(text, provider);
        return jws.getClaims();
    }
}

