const { faker }  = require('@faker-js/faker');
const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

let { TypeLogin, User } = require('@warlords/common');
let { Login } = require('@warlords/storage');

let	{ MailService }	= require('./mail');
let { UserService } = require('../service/user');
let { hash, check } = require('../util/cript');

class AuthService extends Service{

    static async create( loginData ) {

        let login = new Login(loginData);

		let repository = await AuthService.getRepository(Login);

		if( login.type == TypeLogin.MAIL ){

			// verify existi email 
			// 	email == username
			let hasLogin = await repository.findOneBy({
				identifier: login.identifier
			});

			if( hasLogin ) throw new ServiceError("mail in use");//res.badrequest().json({"dd":2323})

			login.password = await hash(login.password);
			
		} else if( login.type == TypeLogin.NONCE ){} //Nonce not implemented

		// adding login for user existing
		if( !login.user.id ) {
			// adding login and new user faker.name.firstName()
			login.user = await UserService.create(new User({ name: login.user.name || faker.name.firstName() }))
		}

		return repository.save(login);
    }

    static async login( loginData ) { 
		let login = new Login(loginData);

		let repository = await AuthService.getRepository(Login);

		let hasLogin = await repository.findOne({
			where:{ identifier: login.identifier },
			relations: ['user']
		});

		if( !hasLogin ) throw new ServiceError("Login or Password Incorrect");

		if( login.type == TypeLogin.MAIL ){

			let result = await check( login.password, hasLogin.password );

			if( result ){
				return hasLogin;
			}

		} else if( login.type == TypeLogin.NONCE ){} //Nonce not implemented

		return false;
	}
    // Not Implement!!!
    static async requestPasswordReset(email) { 
		// Verify email exist

		// Send Email
		let emailTo = "<email que recebera>";
		let emailSubject = "<assunto>";
		let data = {
			resetToken:"",
			username:""
		};
		let placeholder = "<arquivo.pug OU engine posterior>";
		
		MailService.sendEmail(emailTo, emailSubject, data, placeholder);

	}
    // Not Implement!!!
    static async resetPassword(resetToken, newPassword) {}
}

module.exports = { AuthService };