const User = require("../models/user");

const CryptoJs= require("crypto-js");


module.exports = {
    updateUser: async (req,res) => {
       
if(req.body.passowrd){
    req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString();
} 


try {
    const UpdateUser = await User.findByIdAndUpdate(
       
        req.params.id, {
            $set: req.body
        },{new: true}
    );
    // console.log(UpdateUser)
 //const {password,__v, createdAt, ...others} = UpdateUser._doc;

    res.status(200).json(UpdateUser);
} catch(error){
    res.status(500).json(error);
}
    },
    deleteUser: async (req,res) =>{
        try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account Sucessfully deleted ")
        }catch(error){
            res.status(500).json(error);
        }
    },
    getUser: async ( req,res) =>{
        try{
          const user = await User.findById(req.params.id)
          const  {password, __v, createdAt,updatedAt, ...userData} = user._doc;
          res.status(200).json(userData);
        }catch(error){
            res.status(500).json(error);
        }
    },
    getAllUsers: async ( req,res) =>{
        try{
          const allUsers = await User.find();
          
          res.status(200).json(allUsers);
        }catch(error){
            res.status(500).json(error);
        }
    }

}