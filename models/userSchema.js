import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema= new mongoose.Schema({
   firstName:{
    type:String,
    required:true,
    minLength:[3,"First Name Must Contain At Least 3 Character"]
   },
   lastName:{
    type:String,
    required:true,
    minLength:[3,"Last Name Must Contain At Least 3 Character"]
   },
   email:{
    type:String,
    required:true,
    validate:[validator.isEmail,"Please Provide Valid Email"]
   },
   phone:{
    type:String,
    required:true,
    minLength:[10,"Phone Number Must Contain Exact 11 digit"],
    maxLength:[10,"Phone Number Must Contain Exact 11 digit"],
   },
   nic:{
    type:String,
    required:true,
    minLength:[10,"NIC Must Contain At Least 13 digits"],
    maxLength:[10,"NIC Must Contain Exact 13 digit"],
   },
   dob:{
    type:Date,
    required:[true,'DOB is required!!']
   },
   gender:{
    type:String,
    required:true,
    enum:["Male","Female"]
   },
   password:{
    type:String,
    required:true,
    minLength:[6,"Password Must Contain At Least 6 characters"],
    select:false
   },
   role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"]
   },
   doctorDepartment:{
    type:String
   },
   doctorAvatar:{
     public_id:String,
     url:String
   }
   
});

userSchema.pre("save", async function(next){
if(this.isModified("password")){
next()
}
this.password=bcrypt.hash(this.password,10)
})

userSchema.methods.compare=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.generateJwtToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRETE_KEY,{expiresIn:process.env.JWT_EXPIRES})
}


export const User=mongoose.model('User',userSchema)
