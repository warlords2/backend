module.exports = (router) => {
	
	// Create User and Login
	router.get('/', async (req, res) => {
        console.log("bateu!!");
		res.json({"test":222});

	});

}