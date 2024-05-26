import mongoose from "mongoose";
import validator from "validator";

const messageSchema= new mongoose.Schema({
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
   phone:{
    type:String,
    required:true,
    minLength:[10,"Message Must Contain At LEast 10 characters"]
    
   },
   
});
export const Message=mongoose.model('Message',messageSchema)
