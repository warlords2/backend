const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

let { City, Position, Province, World, Npc } = require('@warlords/storage');


class CityService extends Service{

    static async findByProvinceId({ id }) {

        let repository = await CityService.getRepository(City);

        return repository.find({
            where: {
                province:{
                    id
                }
            }
        });
    }

    static async createRandom( worldId, playerId ) {
        // get Default City In World
        
    }

    static async create( worldId, provinceId, ownerId, cityData ) {
        
        let repCity = await CityService.getRepository(City);
        let repWorld = await CityService.getRepository(World);
        let repProvince = await CityService.getRepository(Province);
        let repOwner = await CityService.getRepository(Npc);
        
        // @todo review limit player create city

        let repPosition = await CityService.getRepository(Position);

        cityData.world = await repWorld.findOne( { where: { id: worldId } } );
        
        cityData.province = await repProvince.findOne( { where: { id: provinceId } } );

        cityData.owner = await repOwner.findOne( { where: { id: ownerId } } );

        // ?? Send Game Machine for create city ??
        // ?? Game Machine define City in World?
        // Create Object ??GameMachine?? para interagir com o mundo?? Via RabbitMQ??
        // To imaginando uma banco master que só a game machine interage e os backends de forma limitada 
        // Um Banco Slave para o Back end ler
        // Dá para escalar uam serie de leitores do rabbit mq na game machine??
        // Define Position via alg da game Machine
        cityData.position = await repPosition.save( new Position(cityData.position))

        // @todo valid position in province
        // @todo valid size

        // @todo valid owner npc or player

        return repCity.save(new City(cityData))

        return ''

    }
}

module.exports = { CityService };