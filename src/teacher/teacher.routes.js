import { Router } from "express";
import { crearCurso, editarCurso, eliminarCurso, listarCursos} from "./teacher.controller.js";

const router = Router()

router.post(
    "/crearCurso",
    crearCurso
)

router.patch(
    "/editarCurso/:id",
    editarCurso

)

router.patch(
    "/eliminarCurso/:id",
    eliminarCurso

)

router.get(
    "/listarCursosPorMaestro/:id",
    listarCursos
)

export default router