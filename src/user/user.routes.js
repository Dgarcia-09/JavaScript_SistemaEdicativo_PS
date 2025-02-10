import { Router } from "express";
import { asignarCurso, listarCursos, cursosDeAlumno, eliminarPerfil, actualizarDatos} from "./user.controller.js";


const router = Router()

router.patch(
    "/asignarseCurso/:uid",
    asignarCurso
)

router.get(
    "/listarCursosDisponibles",
    listarCursos
)

router.get(
    "/verCursosEstudiante/:uid",
    cursosDeAlumno

)

router.delete(
    "/eliminarPerfil/:uid",
    eliminarPerfil
)

router.put(
    "/actualizarPerfil/:uid",
    actualizarDatos
)



export default router