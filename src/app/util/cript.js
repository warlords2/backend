const bcrypt = require('bcrypt');
const saltRounds = 13 || process.env.SALT_ROUNDS;

module.exports = {
    hash: async ( data ) => {
        return bcrypt.hash(data, saltRounds);
    },
    check: async ( data, data_hash ) => {
        return bcrypt.compare(data, data_hash);
    }
}