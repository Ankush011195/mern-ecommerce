import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";



export const registerUser = async (req,res)=>{
    try{
        const{name , email , password}= req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "Invalid credentials"})
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user =  await User.create({
            name ,
            email,
            password :hashPassword,
              isAdmin: req.body.isAdmin || false

        });
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email :user.email,
            token : generateToken(user._id),
        });
    }
    catch(error){
        res.status(500).json({message :"Server error"});
    }
};


export const loginUser =async (req , res)=>{
     try{
        const{email , password} = req.body;
         const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
     
}

export const getUserProfile = async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id), // refresh token
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
