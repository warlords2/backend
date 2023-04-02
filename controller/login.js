const { Login, TypeLogin, User } = require('@warlords/storage');

module.exports = (router) => {
	
	// Create User and Login
	router.post('/login/create', async (res,req) => {
		console.log("7");
		let json = await req.readJson();
		console.log("9");
		let login = new Login(json);
		console.log("11");
		let database = await globalThis.manager_database.getConnection();
		console.log("14");
		const userRepository = database.getRepository(Login);
		console.log("15");

		if(  login.type == TypeLogin.MAIL ){

			// verify existi email 
			// 	email == username
			console.log("EMAIL");
			let res_find = await userRepository.findOne({
				username: login.username,
				type: login.type
			});

			console.log(res_find);

		} else if( login.type == TypeLogin.NONCE ){}


		let payload =  await req.authenticad();

		// adding login for user existing
		if( payload ) {
			console.log("Usuario authenticado!");
		// adding login and new user
		} else {
			
		};
		
//		console.log(await globalThis.manager_token.create({email:"gil@mail.com"}))
		res.status('200').json({"dd":2323})

	});
}