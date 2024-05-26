import { Message } from "../models/messagesSchema.js";

export const sendMessage = async (req, resp) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return resp.status(400).json({
      success: "False",
      message: "Please Fill Full Form",
    });
  }

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
  });
};
