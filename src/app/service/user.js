let { User } = require("@warlords/storage");
const { Service } = require("./service");

class UserService extends Service {

    static async create(userData){
        let repository = await UserService.getRepository(User);
        return repository.save(new User(userData));
    }
    
    static findById(id){
        return UserService.getRepository(User).then(repository =>{
            return repository.findOneBy({ id })
        } );
    }

}
module.exports = { UserService };