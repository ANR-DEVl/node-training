const jwt = require('jsonwebtoken')

const verifyToken =(req,res,next)=>{
    try{
    const headerBearer = req.headers.authorization;
    if(!headerBearer||!headerBearer.startsWith('Bearer ')){
        return res.status(401).json({status:'fail',data:{message:'token not provided'}});
    }
    const token = headerBearer.split(' ')[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET)



    next();
    }catch(err){
        return res.status(400).json({status:'error',message:err.message});
    }

}


module.exports = verifyToken