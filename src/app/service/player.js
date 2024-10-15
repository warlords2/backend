

const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');
const { CityService } = require('./city');

let { City, Position, Province, World, Npc, Player } = require('@warlords/storage');


class PlayerService extends Service{

    static async create( worldId, userId, playerData) {
        
        let repPlayer = await PlayerService.getRepository(Player);
        let repCity = await PlayerService.getRepository(City);
        
            
        // Verify user tem 1 player com uma cidade nesse mundo
        // se tiver recusar, primeiro se abandona todas as cidades depois se pode criar um novo player

        let player1 = await repPlayer.find({
            relations: ['user','cities'],
            where: {
                user: {
                    id: userId
                },
                world:{
                    id: worldId
                }
            }
        });

        console.log("player1: ", player1);

        let player2 = await repPlayer.find({
            relations: ['user', 'cities'],
            where: (qb) => {
                qb.where('(ARRAY_LENGTH(player.cities, 1) > 0)')
                  .andWhere('user.id = :userId', { userId })
                  .andWhere('world.id = :worldId', { worldId });
            }
        });

        console.log("player2: ", player2);


        // Criar um novo player 
        if( !player2 || player2.length > 0){
            return console.log("Erro impedir criacao de novo player")
        }

        let player = await repPlayer.save(new Player({
            ...playerData,
            user:{
                id: userId
            },
            world:{
                id: worldId
            }
        }));

        console.log("player: ", player);

        // Criar cidade em uma provincia aleatoria que esteja disponivel, verificar a resposta do service create city retornou 
        // @todo Permitir que o usuario depois de 1 certo ponto poder mudara posição deuma cidade?? de preferencia permitir isso na construcao do mundo ou edicao tipo um macro
        //      Nao, a cidade vai ficar aonde esta!!!!

        let city = await CityService.createRandom(worldId, player.id);
/*        
        // @todo review limit player create city
        let repWorld = await CityService.getRepository(World);
        let repProvince = await CityService.getRepository(Province);
        let repOwner = await CityService.getRepository(Npc);
        let repPosition = await CityService.getRepository(Position);

        cityData.world = await repWorld.findOne( { where: { id: worldId } } );
        
        cityData.province = await repProvince.findOne( { where: { id: provinceId } } );

        cityData.owner = await repOwner.findOne( { where: { id: ownerId } } );

        cityData.position = await repPosition.save( new Position(cityData.position))

        // @todo valid position in province
        // @todo valid size

        // @todo valid owner npc or player

        return repCity.save(new City(cityData))

        return ''*/

    }
}

module.exports = { PlayerService };