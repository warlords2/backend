// Controller's hook and logs
module.exports = (error, res, req) =>{
    
    return res.badrequest().json({
        "timestamp": new Date(),
        "status": 401,
        "error": error.code,
        "message": error.getMenssage(),
        "path": req.url
    });
}