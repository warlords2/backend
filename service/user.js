let { User } = require("@warlords/storage");
const { Service } = require("./service");

class UserService extends Service {
    
    static async findById(id){
        return UserService.getRepository(User).then(repository =>{
            return repository.findOneBy({ id })
        } );
    }

}
module.exports = { UserService };