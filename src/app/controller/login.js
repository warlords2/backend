const { ControllerError } = require('../errors/model/controller.error.js');

let { Login } = require('@warlords/common');
let { AuthService } = require('../service/auth.js');
let { UserService } = require('../service/user');

module.exports = (router) => {
	
	// Create User and Login
	router.post('/login/create', async (req, res) => {

		let json = await req.readJson();
		console.log(json);

		let auth =  await req.authenticad();

		let loginData = new Login(json);

		// Valid request and Check CONSTRAINT User
		let errors = await loginData.isValid();
		for(let erro of errors){
			for(let msg of Object.keys(erro.constraints) ){
				throw new ControllerError( erro.constraints[msg] ,'VALID');
			}
		}

		if( auth ){
			loginData.user = await UserService.findById(auth.id);
		}
		let loginEntity = await AuthService.create(loginData);

		let jwt = await globalThis.util.token.create({ 
			"identifier": loginEntity.identifier, 
			"type": loginEntity.type,
			"id": loginEntity.user.id, 
			"name": loginEntity.user.name
		});

		res.created().send(jwt);

	})//.catch(err =>{ return res.badrequest().end() })

	router.post('/login/auth', async (req, res) => {

		let json = await req.readJson();
		console.log(json);

		let loginData = new Login(json);

		// Valid request and Check CONSTRAINT User
//		let errors = await loginData.isValid();
		if( loginData.identifier.length < 1 && loginData.password.length < 1){
			throw new ControllerError( "Login or Password Incorrect" ,'VALID')
		}

		let loginEntity = await AuthService.login(loginData);
		
		if( !loginEntity ) throw new ControllerError( "Login or Password Incorrect" ,'VALID') 
		

		let jwt = await globalThis.util.token.create({
			"identifier": loginEntity.identifier, 
			"type": loginEntity.type,
			"id": loginEntity.user.id, 
			"name": loginEntity.user.name
		});

		res.created().send(jwt);

	})

}