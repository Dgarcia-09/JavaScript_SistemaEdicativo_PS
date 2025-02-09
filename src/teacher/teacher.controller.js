import Teacher from "./teacher.model.js";

import Course from "../course/course.model.js";


export const crearCurso = async (req, res) => {
    try {
        const { name, teacherId } = req.body;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(400).json({
                message: "El maestro no existe"
            });
        }

        const curso = await Course.create({
            name,
            teacher: teacherId
        });

        teacher.courses.push(curso._id);
        await teacher.save();

        return res.status(200).json({
            message: "El curso ha sido creado",
            curso
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el curso",
            error: error.message
        });
    }
};


export const editarCurso = async (req, res) => {
    try {
        const { id } = req.params;  
        const { name } = req.body; 

        const course = await Course.findById(id);
        if (!course) {
            return res.status(400).json({ message: "Course not found" });
        }

        course.name = name || course.name;
        await course.save();

        return res.status(200).json({
            message: "Course updated successfully",
            course
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating course",
            error: err.message
        });
    }
};

export const eliminarCurso = async (req, res) => {  
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, { status: false }, { new: true });
        const teachers = await Teacher.find({ courses: id });

        await Promise.all(teachers.map(async teacher => {
            teacher.courses = teacher.courses.filter(courseId => courseId.toString() !== id);
            await teacher.save();
        }));

        return res.status(200).json({
            success: true,
            message: "Curso eliminado exitosamente",
            course
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message
        });
    }
};

export const listarCursos = async (req, res) => {
    try {
        const { id } = req.params;  // ID del maestro
        const { limite = 4, desde = 0 } = req.query;

        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Maestro no encontrado"
            });
        }

        const query = { teacher: id, status: true }; 
        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            courses
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al visualizar los cursos del maestro",
            error: err.message
        });
    }
};


