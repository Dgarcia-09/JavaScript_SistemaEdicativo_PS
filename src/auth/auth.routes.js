import {Router} from "express"
import {login, register} from "../auth/auth.controller.js"
import { loginValidator, registerValidator } from "../middlewares/user-validators.js"
import {uploadProfilePicture} from "../middlewares/multer-uploads.js"

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
)

router.post(
    "/login",
    loginValidator,
    login
)

export default router