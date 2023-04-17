let { Login } = require('@warlords/storage');
const { Service } = require('./service');

class AuthService extends Service{

    static async create( loginData ) {

        let login = new Login(loginData);

		let repository = await AuthService.getRepository(Login);

		if( login.type == TypeLogin.MAIL ){

			// verify existi email 
			// 	email == username
			let has_login = await repository.findOneBy({
				username: login.username
			});

			if(!has_login) throw new Error("Not Found");//res.badrequest().json({"dd":2323})
			
		} else if( login.type == TypeLogin.NONCE ){}

		// adding login for user existing
		if( login.user ) {
			// create login
			console.log("Usuario authenticado!");

		// adding login and new user
		} else {
			// create user
			console.log("Não existe o Usuario");
		};
        
    }

    static async login(email, password) {  }
    
    static async logout(userId) {   }
    
    static async requestPasswordReset(email) {  }

    static async resetPassword(resetToken, newPassword) {}
}

module.exports = { AuthService };