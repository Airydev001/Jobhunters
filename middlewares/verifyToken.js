const User =require("../models/user");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req,res,next)=>{
  const authHeader  = req.headers["authorization"];
  console.log(authHeader);
  // if(authHeader){
  //   const token = authHeader.split(" ")[1];
  //   console.log(token)
  //   jwt.verify(token, process.env.JWT_SEC || "japhethio 1234", (err,user)=>{
  //    if(err) res.status(403).json("Invalid Token");

  //     console.log(user);

  //    //console.log(user)
  //    next()
    // })
    if(!authHeader) res.sendStatus(401);

    console.log(authHeader);
    
    const token = authHeader.split(" ")[1];
console.log(token);
    jwt.verify(token, process.env.JWT_SEC,async (err,decoded)=>{
      if(err) res.status(403).json("Invalid Token");
      req.user  = decoded;
      console.log(decoded);
      next();
    })
    }
 


const verifyAndAuthorization = (req,res,next)=>{
    
    verifyToken(req,res,()=>{

        if(req.user.id === req.params.id){
            next();
            console.log(req.params.id);
        }else{
            res.status(403).json("You are restricted to perform this operation")
        }
    })
}
const verifyAndAdmin = (req,res,next)=>{
    
    verifyToken(req,res,()=>{

        if(req.user.isAdmin){
            next();
           
        }else{
            res.status(403).json("You are restricted to perform this operation")
        }
    })
}

module.exports = {verifyToken,verifyAndAuthorization,verifyAndAdmin};

// const token = req.body.token || req.query.token || req.headers["x-access-token"];

//   if(!token){
//   return  res.status(403).send("A token is required for authentication") || res.status(403).json("Invalid token");
//   }
    
// try {
//     const decoded = jwt.verify(token,process.env.JWT_SEC)
//     req.user = decoded;
//     console.log(decoded)

//     if(req.user.id === req.params.id){
//         next();
//     } else {
//         res.status(403).json("You are restricted to perform this operation");
//     }
// }
// catch(err){
//   return res.status(401).send("Invalid Token");  
// }