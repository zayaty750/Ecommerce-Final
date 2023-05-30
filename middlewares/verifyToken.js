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

// Verify Token & Authorize the user
function verifyTokenAndAuthorization(req,res,next){
    //hanndh el function eli fo2 3ady
    verifyToken(req,res,()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403) //forbidden
            .json({message: "You Are Not Allowed"});
        }
    });

}

// Verify Token & Authorize the Admin
function verifyTokenAndAdmin(req,res,next){
    //hanndh el function eli fo2 3ady
    verifyToken(req,res,()=> {
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403) //forbidden
            .json({message: "You Are Not Allowed, only admin allowed"});
        }
    })

}



module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}