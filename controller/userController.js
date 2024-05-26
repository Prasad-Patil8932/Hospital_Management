import { catchAsyncErrors } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userSchema.js";

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
  resp.status(200).json({
    success:true,
    message:"User Created Successfully"

  })
});
