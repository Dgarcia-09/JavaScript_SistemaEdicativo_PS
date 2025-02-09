import {hash} from "argon2"
import Teacher from "./teacher.model"


export const registrarCursos = async (req, res) =>{
    try{
        const data  = req.body
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        const teacher  = await Teacher.create(data);
 
        return res.status(200).json({
            message: "Cursos HAN SIDO CREADOS",
            name: teacher.name,
            cursos: teacher.cursos
 
        })
    }catch(e){
        return res.status(500).json({
            message: "FALLO EN EL REGISTRO DE CURSOS",
            error: e.message
        });
    }
}
