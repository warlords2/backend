const bcrypt = require('bcrypt');
const saltRounds = 14 || process.env.SALT_ROUNDS;

const myPlaintextPassword = 'olarouterdan_2321@';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        console.log("PASSWORD: "+myPlaintextPassword)
        console.log("SALT ROUNDS: "+saltRounds)
        console.log("----------------------")
        console.log("SALT: "+salt)
        console.log("HASH: "+hash)
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            console.log("IS Password?: "+result)
        });
        bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
            console.log("IS not Password?: "+result)
        });
    });
});