const JWS = require('node-jws')['default'];
const { JWTAlghoritm } = require('node-jws');
const FileProvider = require('node-jws-file-provider')['default'];


const provider = FileProvider('../../../private-key.pem', '../../../public-key.pem');
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

    let jws_current = JWS.fromString("eyJhbGciOiJSUzUxMiJ9.eyJuYmYiOjE2OTgwMDkwNjYsImV4cCI6MTY5ODA0NTA2NiwiaWF0IjoxNjk4MDA5MDY2fQ.SJqfwpkH4NdM3S8vmEos35HTPhqx3b4dBoh9Toos208H4PmGoUSjTHMcbR8MXKzya_Bm_5dKNpy_X0PfSqBo-yaaTpZB4jb3YPHLGXgw5K8HJRZv23_jXqgQpflxpAacUAiW1nPqh1gWhJbC9MVgT5u5-m8538UYiw0CynguELsRR9y5exKL7C6zdKdo5auvN7zKXxVglu0LH9ril_pTgDVy5sGIYrC-xRsuL8G_N7x4x1c8D3bXIgnelg4a25RQvqkVtigziBCCs-9bKj5Xrtk9mSEoMS7MRchZSN6Yjlbm7h-shT0SF7fKHWb8Z_WQfUh8JvczoxMTfYu1cBJKcSHso3W2nYz5nm_vnrIpA7b-fYPUCxz3Nn0RWIYvJolPPvMATVs4O9vicuvo4kmiQgDUy1KIT6_AUWY4a5BlXCm8x3QzI_AINyuA5O5uVMoJ0NcLjeHHPUWPXopTMQ2bv67p4rBl4u2qC0wB70q09VePrpRfPd19PrG49j1OtjdK", provider);

    console.log("JWT Current:");
    console.log("\tHeader:");
    console.log(jws_current.getHeader());
    console.log("\tClaim:");
    console.log(jws_current.getClaims());
    console.log("\tValid:");
    console.log(await jws_current.valid());
    console.log("\tJWT:");
    console.log(jws_current.toString());

});

