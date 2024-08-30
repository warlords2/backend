module.exports = (router) => {
	
	// check
	router.get('/', async (req, res) => {
        console.log("/ - check");

		res.json({"status": "ok"});

	});

}