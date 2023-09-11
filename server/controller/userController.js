const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req,res,next) => {

    try{

    const {username, email , password} = req.body;
    const usernameCheck = await User.findOne({username});
    const emailCheck = await User.findOne({email});


    if(usernameCheck) 
        return res.json({msg : "username already exists", status : false});
    
    if(emailCheck) 
        return res.json({msg : "Email already exists", status : false});

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.Create({
        email,
        username,
        password: hashedPassword,
    });

    delete user.password;
    return res.json({status: true, user});
    }
    catch (ex){
        next(ex);
    }

}