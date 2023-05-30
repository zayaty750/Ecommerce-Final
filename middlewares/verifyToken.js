const jwt = require("jsonwebtoken");
// verify Token
function verifyToken(req,res,next){
    const token = req.headers.token;
    if(token){
        try {
            //el decoded fyha object w deh feha el id w el admin mn el payload
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user=decoded;
            next();
        } catch (error) {
            res.status(401).json({message:"in valid token"});
        }
    }else{
        res.status(401).json({message:"no token provided"});
    }
}

