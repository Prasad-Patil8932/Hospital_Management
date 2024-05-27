import { catchAsyncErrors } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";


export const patientRegister = catchAsyncErrors(async (req, resp, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User All Ready Register", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  });
  generateToken(user,"User Created Successfully",200,resp)
  
});


export const login= catchAsyncErrors(async(req,resp,next)=>{
  const {email,password,confirmPassword,role}=req.body
  if(!email|| !password ||  !confirmPassword || !role){
    return next(new ErrorHandler("Please Provides All Fields",400))
  }

 
  if (password!== confirmPassword){
    return next(new ErrorHandler("Password And Confirm Password Does not Match",400))
  }

  const user =await User.findOne({email}).select("+password")

  if (!user){
    return next(new ErrorHandler("Invalid Email or Password",400))
  }

  const isPasswordMatched=await user.compare(password)
  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password",400))
  }
  if(role!==user.role){
    return next(new ErrorHandler("User With This Role Not Found",400))
  }

  generateToken(user,"User LogIn Successfully",200,resp)
 
})
