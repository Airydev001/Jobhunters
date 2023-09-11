const User = require("../models/user");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req,res)=>{
        const {username, email,password} = req.body;

        if(!(email && password && username)){
         res.status(400).json({
            error: "all input is required"
         });
        }

    
        
        



            const OldUser = await User.findOne({email});

            if(OldUser){
                return res.status(409).send("User Already exist . Please Log in");
            }

            const hashedPassword = CryptoJs.AES.encrypt(password, process.env.SECRET).toString();

            const newUser = new User({
                 username: username,
                 email: email.toLowerCase(),
                 password: hashedPassword,
        
                 // CryptoJs.AES.encrypt("Message", process.env.SECRET)
                });
                    

// const token = jwt.sign({user_id:newUser._id, email}, process.env.JWT_SEC,{
//     expiresIn: "2h",
// })

//         newUser.token = token;
        
try{
    console.log(require("crypto").randomBytes(64).toString('hex'));
        const savedUser = await newUser.save();
       
        // const newUser = new User({
        //  username: username,
        //  email: email.toLowerCase(),
        //  password: hashedPassword,

        //  // CryptoJs.AES.encrypt("Message", process.env.SECRET)
        // });
            //const savedUser = await newUser.save();

            res.status(201).json(savedUser);
        } catch(error){
res.status(500).json(error);
        }
    },

    //login user
    loginUser: async(req,res)=>{
       
const {email,password} = req.body;

if(!(email && password )){
    res.status(400).json({
    message: "All input is required "
    })
}
        try{
    
        const user = await User.findOne({email: email});
        !user && res.status(401).json("Wrong Login Details");

        

        const decryptedpass = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
        const dePassword = decryptedpass.toString(CryptoJs.enc.Utf8);

        console.log(dePassword);

        dePassword !== req.body.password && res.status(401).json("Wrong Password");
        
      
        //  const token = jwt.sign(
        //     {user_id: user._id, email},
        //     process.env.JWT_SEC,
        //     {
        //         expiresIn: "2h",
        //     }
        //  );
        //  user.token = token;   
        

        
        const { password, __v, createdAt, ...others}= user._doc;

        const userToken = jwt.sign({
            id: user._id,isAdmin: user.isAdmin, isAgent: user.isAgent

        },process.env.JWT_SEC,{
            expiresIn: "21d"
        });
 //req.token=userToken


        res.status(200).json({...others, userToken});
        
        }catch(error){
         res.status(500);
        }
    } 
}