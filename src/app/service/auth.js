const { faker }  = require('@faker-js/faker');
const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

let { TypeLogin, User } = require('@warlords/common');
let { Login } = require('@warlords/storage');


let { UserService } = require('../service/user');
let { hash } = require('../util/cript');

class AuthService extends Service{

    static async create( loginData ) {

        let login = new Login(loginData);

		let repository = await AuthService.getRepository(Login);

		console.log("CREATE", loginData)

		if( login.type == TypeLogin.MAIL ){

			console.log("CREATE MAIL")
			// verify existi email 
			// 	email == username
			let has_login = await repository.findOneBy({
				identifier: login.identifier
			});

			console.log("CREATE MAIL 2")

			if( has_login ) throw new ServiceError("mail in use");//res.badrequest().json({"dd":2323})

			console.log("CREATE MAIL 3")

			login.password = await hash(login.password);
			
		} else if( login.type == TypeLogin.NONCE ){}

		console.log("ADDING LOGIN")

		// adding login for user existing
		if(!login.user ) {

			console.log("LOGIN ADDING")
			// adding login and new user faker.name.firstName()
			login.user = await UserService.create(new User({ name: faker.name.firstName() }))

			console.log("ADDING LOGIN ",login.user)
		}

		return repository.save(login);
    }

    static async login(email, password) {  }
    
    static async logout(userId) {   }
    
    static async requestPasswordReset(email) {  }

    static async resetPassword(resetToken, newPassword) {}
}

module.exports = { AuthService };