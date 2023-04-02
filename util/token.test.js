const JWS = require('node-jws')['default'];
const { JWTAlghoritm } = require('node-jws');
const FileProvider = require('node-jws-file-provider')['default'];


const provider = FileProvider('./private-key.pem', './public-key.pem');
const token = new JWS(provider);


// CREATE TOKEN
token.useAlghoritm(JWTAlghoritm.RS512);

token.notValidBefore(new Date()).expiresIn(60 *60); // 1h

console.log(token)

token.setClaims({
    email: 'teste@mail.com',
    uuid:'3434234-234234-234234-234234-2342'
});

token.sign().then(async (re)=>{
    console.log("JWT Origin:");
    console.log("\tHeader:");
    console.log(token.getHeader());
    console.log("\tClaim:");
    console.log(token.getClaims());
    console.log("\tValid:");
    console.log(await token.valid());
    console.log("\tJWT:");
    console.log(token.toString());
    
    
    console.log("-------------------------------------------");

    //TOKEN alter email
    let jws = JWS.fromString("eyJhbGciOiJSUzUxMiJ9.eyJuYmYiOjE2ODAyODU2OTksImV4cCI6MTY4MDI4OTI5OSwiZW1haWwiOiJ0ZXN0ZTc3QG1haWwuY29tIiwidXVpZCI6IjM0MzQyMzQtMjM0MjM0LTIzNDIzNC0yMzQyMzQtMjM0MiIsImlhdCI6MTY4MDI4NTY5OX0.yGKNHbp8jTZGPuJP5OYZYID-LR4nK2MBM5dXk-mJAwEQ6YqBIhVsapnQKqi1OTZxxQZuyIjbay0C2bsKOAWTdKrNekihQ72NeAjBbMl4xYp1QXr45mrAkRT3QS8RiyzebJ-_kYAYOgKe2S8p1xOLmI-40hHYSAcHEZMIYg5vV2Ui3zhohaxvRlKUYe5_uR7KfFObLbnm8yfPg4NaDYgszEeJ5aeAGiSPc0d49zGLgMO54caPrqMGEPA3gzcDHltIboYp3axqE4qRrdaWkM5Z5Lii9NK8S8J9Sy6VZXSFHJzAcTnwmBdOjGlT7Cx5b0susJ2aDJ-ymE-AbnGcbj5VhA", provider);

    console.log("JWT Now:");
    console.log("\tHeader:");
    console.log(jws.getHeader());
    console.log("\tClaim:");
    console.log(jws.getClaims());
    console.log("\tValid:");
    console.log(await jws.valid());
    console.log("\tJWT:");
    console.log(jws.toString());
});

