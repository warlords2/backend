let { Login } = require('@warlords/common');
let { AuthService } = require('../service/auth.js');
let { UserService } = require('../service/user');

module.exports = (router) => {
	
	// Create User and Login
	router.post('/login/create', async (res,req) => {

		let json = await req.readJson();
		let auth =  await req.authenticad();

		let loginData = new Login(json);
/*
		if(auth){
			let user = await UserService.findById(auth.uuid);
			loginData.user = user;
		}
*/		
		if( loginData.isValid() ){

//			let user = await UserService.create(auth.uuid);
			console.log("VALID!!")

		}else console.log("INVALID!!!")
		
//		console.log(await globalThis.manager_token.create({email:"gil@mail.com"}))
		res.status('200').json({"dd":2323})

	});
}