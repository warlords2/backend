const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

let { Province, World, Position } = require('@warlords/storage');


class ProvinceService extends Service{

    static async findByWorldId({ id }) {

        let repository = await ProvinceService.getRepository(Province);

        return repository.find({
            relations: ['position' ,'cities'],
            where: {
                world: {
                    id
                }
            }
        });
    }
}

module.exports = { ProvinceService };