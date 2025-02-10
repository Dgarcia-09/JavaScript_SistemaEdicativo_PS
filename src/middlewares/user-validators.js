import {body, param} from "express-validator";
import { emailExists, userExists, emailExistsT, userExistsT } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import {deleteFileOnError} from "./delete-file-on-error.js"
import {handleErrors} from "./handle-errors.js"

export const registerValidator = [
    body("name").notEmpty().withMessage("Ingrese sus nombres"),
    body("surname").notEmpty().withMessage("Ingrese sus apellidos"),
    body("email").notEmpty().withMessage("Ingrese su correo"),
    body("email").isEmail().withMessage("Ingrese un email valido"),
    body("password").isLength({min:8}).withMessage("La constrasena debe tener minimo 8 caracteres"),
    body("role").optional().custom((value) => {
            if (value && value !== "STUDENT_ROLE") {
                throw new Error("Solo se permite el rol STUDENT_ROLE");
            }
            return true;
        }),
    body("email").custom(emailExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]


export const registerValidatorM = [
    body("name").notEmpty().withMessage("Ingrese sus nombres"),
    body("surname").notEmpty().withMessage("Ingrese sus apellidos"),
    body("email").notEmpty().withMessage("Ingrese su correo"),
    body("email").isEmail().withMessage("Ingrese un email valido"),
    body("password").isLength({min:8}).withMessage("La constrasena debe tener minimo 8 caracteres"),
    // Hace la validacion para que  el campo de role sea opcional pero que solo se pueda ingresar el rol de maestro, ni yo se por que lo hice asi xd, pero ya me da pereza cambiarlo
    body("role").optional().custom((value) => {
            if (value && value !== "TEACHER_ROLE") {
                throw new Error("Solo se permite el rol TEACHER_ROLE");
            }
            return true;
        }),
    body("email").custom(emailExistsT),
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