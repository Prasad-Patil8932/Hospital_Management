import { catchAsyncErrors } from "../middlewares/catchAsyncErros.js";
import { Message } from "../models/messagesSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
export const sendMessage =catchAsyncErrors( async (req, resp) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler('Please fill full form',400))
    };
  

  await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  resp.status(200).json({
    success: true,
    message: "Message Send Successfully",
  })
});
