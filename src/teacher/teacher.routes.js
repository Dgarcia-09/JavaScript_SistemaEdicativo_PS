import { Router } from "express";
import { crearCurso } from "./teacher.controller.js";

const router = Router()

router.post(
    "/crearCurso",
    crearCurso
)

export default router