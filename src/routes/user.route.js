import { Router } from "express";
import
{
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
} 
from
 '../Controller/user.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/register", registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
export default router;