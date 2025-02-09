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
