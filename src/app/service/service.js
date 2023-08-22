
class Service{

    static async getRepository( entity_class ){

        return globalThis.manager.database.getConnection().then(()=> {
            return globalThis.manager.database.getRepository(entity_class);
        });

    }

}

module.exports = { Service };