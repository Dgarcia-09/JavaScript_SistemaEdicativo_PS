import Teacher from "./teacher.model.js";

import Course from "../course/course.model.js";


export const crearCurso = async (req, res) => {
    try {
        const { name, teacherId } = req.body; // Extrae los datos necesarios del body
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) { // Verifica si el maestro existe
            return res.status(400).json({
                message: "El maestro no existe"
            });
        }

        //Crea el curso y lo asigna al maestro del id
        const curso = await Course.create({
            name,
            teacher: teacherId
        });

        //Une al maestro con el curso en la BD
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

        const course = await Course.findById(id); //Busca el curso por el ID
        if (!course) {
            return res.status(400).json({ message: "Curso no encontrado" });
        }

        //Actualiza el nombre del curso 
        // || = or
        course.name = name || course.name;
        await course.save();
        return res.status(200).json({
            message: "El curso ha sido actualizado exitosamente",
            course
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar el curso",
            error: err.message
        });
    }
};

export const eliminarCurso = async (req, res) => {  
    try {
        const { id } = req.params;
        //Desactiva el curso ya que eliminar completamente es una mala practica
        const course = await Course.findByIdAndUpdate(id, { status: false }, { new: true });

        //Busca a los maestros que tengan asigando ese curso
        const teachers = await Teacher.find({ courses: id });

        //Elimina la referencia al curso en los maestros que tenagn el curso

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
        const { id } = req.params; 
        const { limite = 4, desde = 0 } = req.query;

        //Busca el maestro por la ID

        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(400).json({
                success: false,
                message: "Maestro no encontrado"
            });
        }

        // Realiza la consulta para obtener todos los cursos que esten activos 

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


