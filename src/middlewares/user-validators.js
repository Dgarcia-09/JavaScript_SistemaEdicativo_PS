import {body, param} from "express-validator";
import { emailExists, userExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import {deleteFileOnError} from "./delete-file-on-error.js"
import {handleErrors} from "./handle-errors.js"

export const registerValidator = [
    body("name").notEmpty().withMessage("Ingrese sus nombres"),
    body("surname").notEmpty().withMessage("Ingrese sus apellidos"),
    body("email").notEmpty().withMessage("Ingrese su correo"),
    body("email").isEmail().withMessage("Ingrese un email valido"),
    body("password").isLength({min:8}).withMessage("La constrasena debe tener minimo 8 caracteres"),
    body("role").optional().isIn(["STUDENT_ROLE", "TEACHER_ROLE"]).withMessage("El rol ingresado no es valido"),
    body("email").custom(emailExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email valido"),
    body("password").isLength({min:8}).withMessage("La contrasena debe tener 8 caracteres minimo"),
    validarCampos,
    handleErrors
]