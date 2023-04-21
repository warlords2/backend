const JWS = require('node-jws')['default'];
const { JWTAlghoritm } = require('node-jws');
const FileProvider = require('node-jws-file-provider')['default'];

const provider = FileProvider('./private-key.pem', './public-key.pem');
const tokenDefault = new JWS(provider);

const token_ttl = (60*60/* 1h*/) || process.env.TOKEN_TTL;

tokenDefault.useAlghoritm(JWTAlghoritm.RS512);

module.exports = {

    create: async ( data , ttl = 60*60) => {
        tokenDefault.setClaims(data)
        tokenDefault.notValidBefore(new Date()).expiresIn(ttl);
        await tokenDefault.sign();
        return tokenDefault.toString();
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

