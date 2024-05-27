import express from "express"
import{sendMessage} from "../controller/message.controller.js"
import { getAllMessages } from "../controller/message.controller.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/send",sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);


export default router