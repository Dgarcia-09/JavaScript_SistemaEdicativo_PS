import {Router} from "express"
import {loginStudent, registerStudent, loginTeacher, registerTeacher} from "../auth/auth.controller.js"
import { loginValidator, registerValidator, registerValidatorM } from "../middlewares/user-validators.js"
import {uploadProfilePicture} from "../middlewares/multer-uploads.js"

const router = Router()

router.post(
    "/registerStudent",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    registerStudent
)

router.post(
    "/loginStudent",
    loginValidator,
    loginStudent
)

router.post(
    "/registerTeacher",
    uploadProfilePicture.single("profilePicture"),
    registerValidatorM,
    registerTeacher
);

router.post(
    "/loginTeacher",
    loginValidator,
    loginTeacher
);
export default router