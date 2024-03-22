const { ControllerError } = require('../errors/model/controller.error.js');

let { ProvinceService } = require('../service/province.js');
let { CityService } = require('../service/city.js');
const { City } = require('@warlords/common');

module.exports = (router) => {
	
	// Create User and Login
	router.get('/world/:worldId/province/:provinceId/city', async (req, res) => {

        let provinceId = req.params.provinceId;
		
		let province = await ProvinceService.findById({id: provinceId});
        let cities = await CityService.findByProvinceId(province);

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": cities,
			"path": req.url
		});
	});

	router.post('/world/:worldId/province/:provinceId/city', async (req, res) => {

		let json = await req.readJson();
		
		let worldId = req.params.worldId;
		let provinceId = req.params.provinceId;
		
		let cityData = new City(json);
		
		let errors = await cityData.isValid();
		for(let erro of errors){
			for(let msg of Object.keys(erro.constraints) ){
				throw new ControllerError( erro.constraints[msg] ,'VALID');
			}
		}

		let city = await CityService.create( worldId, provinceId, cityData.owner.id, cityData );

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": city,
			"path": req.url +'/'+ city.id
		});
	});

}