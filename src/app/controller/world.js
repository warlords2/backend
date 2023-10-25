const { ControllerError } = require('../errors/model/controller.error.js');

let { WorldService } = require('../service/world.js');

module.exports = (router) => {
	
	// Create User and Login
	router.get('/world', async (req, res) => {

		let listWorlds = await WorldService.find();

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": listWorlds,
			"path": req.url
		});
	});

}