const { ControllerError } = require('../errors/model/controller.error.js');

let { ProvinceService } = require('../service/province.js');

module.exports = (router) => {
	
	// Create User and Login
	router.get('/world/:worldId/province', async (req, res) => {

		let worldId = req.params.worldId;
		
		let provinces = await ProvinceService.findByWorldId({id: worldId});

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": provinces,
			"path": req.url
		});
	});

}