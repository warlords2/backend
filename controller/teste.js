module.exports = (router) => {
	router.get('/user',async (res,req)=>{
		res.status('201').json({"oi":"como vai?"})
	});
}