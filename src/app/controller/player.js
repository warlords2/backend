const { ControllerError } = require('../errors/model/controller.error.js');

let { PlayerService } = require('../service/player.js');
let { ProvinceService } = require('../service/province.js');
let { CityService } = require('../service/city.js');
const { Player } = require('@warlords/common');

module.exports = (router) => {
	
	// Create Player In World
	router.post('/world/:worldId/player/create', async (req, res) => {

        let auth = await req.authenticad();

        if(!auth) throw new ControllerError( "UNAUTHORIZED" ,'VALID') 

        let playerData = await req.readJson();

        let worldId = req.params.worldId;
        let userId  = auth.id;
        

        let player = new Player(playerData);

        let errors = await player.isValid();
		for(let erro of errors){
			for(let msg of Object.keys(erro.constraints) ){
				throw new ControllerError( erro.constraints[msg] ,'VALID');
			}
		}

        let data = await PlayerService.create(worldId, userId, player);

		res.json(data);
	});

}