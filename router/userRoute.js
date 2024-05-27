import express from "express"
import{login, patientRegister} from "../controller/userController.js"

const router = express.Router();


router.post("/patient/register",patientRegister);
router.post("/patient/login",login);

export default router