const { ControllerError } = require('../errors/model/controller.error.js');

let { Login } = require('@warlords/common');
let { AuthService } = require('../service/auth.js');
let { UserService } = require('../service/user');

module.exports = (router) => {
	
	// Create User and Login
	router.post('/login/create', async (req, res) => {

		let json = await req.readJson();
		let auth =  await req.authenticad();
		console.log("AUTH")
		let loginData = new Login(json);
		
		// Valid request and Check CONSTRAINT User
		let errors = await loginData.isValid();
		for(let erro of errors){
			for(let msg of Object.keys(erro.constraints) ){
				throw new ControllerError( erro.constraints[msg] ,'VALID');
			}
		}
		console.log("AUTH")
		if( auth ){
			loginData.user = await UserService.findById(auth.id);
		}
		console.log("AuthService.create")
		return AuthService.create(loginData).then( loginEntity =>{
			console.log("Login entity --> ", loginEntity)
			return globalThis.util.token.create( { 
				"identifier": loginEntity.identifier, 
				"id": loginEntity.id, 
				"type": loginEntity.type 
			} ).then(jwt=>{
				res.created().send(jwt);
			});

		}).catch(err =>{ return res.badrequest().end() })

	});

}