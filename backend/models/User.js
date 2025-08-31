import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required :[true,"Please enter your name"],
        },
        email :{
            type :String,
            required : true,
            unique :true,
            lowercase : true,
        },
        password : {
            type : String,
            required : true,
            minlength : 6,
        },
                wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        ],
        
        isAdmin:{
            type : Boolean,
            required : true,
            default : false,
        },
    },
    {
        timestamps:true,
    }
);


const User = mongoose.model("User",userSchema);
export default User;