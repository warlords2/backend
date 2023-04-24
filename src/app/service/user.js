let { User } = require("@warlords/storage");
const { Service } = require("./service");

class UserService extends Service {

    static async create(userData){
        console.log("HIIIIIIII")
        
        let repository = await UserService.getRepository(User);
        
        console.log("OIIIIII",userData)
        console.log("OIIIIII",new User(userData))
        return repository.save(new User(userData));

    }
    
    static findById(id){
        return UserService.getRepository(User).then(repository =>{
            return repository.findOneBy({ id })
        } );
    }

}
module.exports = { UserService };