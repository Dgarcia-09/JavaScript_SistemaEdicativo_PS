import { hash } from "argon2";
import Course from "../course/course.model.js"
import User from "./user.model.js"

import mongoose from "mongoose";

/*
Controlador de estudiante, y se estaran preguntadno por que se llama user, la respuesta es que al principio 
queria realizar el porgrama de una forma diferente (un solo modelo en lugar de dos) pero como no me funciono y perdia tiempo
cambiando todo, decidi dejarlo asi

*/
export const asignarCurso = async (req, res) => {
    const { uid } = req.params;  
    const { courseId } = req.body;  

    //Verifica si el id esta en la BD y es valido
    try {
        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({
                success: false, 
                message: "El ID de estudiante no es valido"
            });
        }

        //Busca al estudiante por su ID
        const student = await User.findById(uid);
        if (!student) {
            return res.status(400).json({
                success: false, 
                message: "El estudiante con el ID indicado no fue encontrado"
            });
        }

        //Verifica la cantidad de cursos que tiene el estudiante para que no se asigne a mas de tres

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "No se encontro el curso"
            });
        }
        if (student.courses.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "Cada estudiante solo puede asignarse a 3 cursos"
            });
        }
        // Verifica para que el estudiante no se asigne al mismo curso dos veces 
        if (student.courses.includes(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Este estudiante ya ha sido asignado a este curso"
            });
        }
        student.courses.push(courseId);
        await student.save();

        course.students.push(uid);
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Se le ha asginado correctamente al curso",
            student
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al asignarse al curso",
            error: err.message
        });
    }
};


export const listarCursos = async (req, res) => {
    try {
        const courses = await Course.find({ status: true });  

        if (courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No se encontraron cursos"
            });
        }

        return res.status(200).json({
            success: true,
            courses
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        });
    }
};

export const cursosDeAlumno = async (req, res) => {
    try {
        const { uid } = req.params;  
        /*
        Busca al esudinate y obtiene sus cursos activos
        populate: me devuelve toda la info de cursos
        */
        const user = await User.findById(uid).populate({
            path: 'courses',
            match: { status: true }  
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                courses: user.courses || [] 
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos del usuario",
            error: err.message
        });
    }
};

// Cambia el estadp del ususario para que no se muestre al listar a todos los usuarios
export const eliminarPerfil = async (req, res) => {
    try{
        const { uid } = req.params
        
        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Perfil eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el perfil",
            error: err.message
        })
    }
}

export const actualizarDatos = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Tu perfil ha sido actualizado",
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el perfil",
            error: err.message
        });
    }
}

