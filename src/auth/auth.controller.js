import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import Teacher from "../teacher/teacher.model.js"
import {generateJWT} from "../helpers/generate-jwt.js"



export const registerStudent = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data);

        return res.status(200).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}


export const loginStudent = async (req, res) =>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({
            $or:[{email:email}]
        })
        if(!user){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "Contrasena incorrecta"
            })
        }
        const validPassword = await verify(user.password, password)
        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inalvidas",
                error: "Contrasena incorrecta"
            })

        }
        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })

    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })

    }
}

export const registerTeacher = async (req, res) => {
    try {
        const dataT = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(dataT.password)
        dataT.password = encryptedPassword
        dataT.profilePicture = profilePicture

        const teacher = await Teacher.create(dataT);

        return res.status(200).json({
            message: "Teacher has been created",
            name: teacher.name,
            email: teacher.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Teacher registration failed",
            error: err.message
        });
    }
}


export const loginTeacher = async (req, res) =>{
    const {email, password} = req.body
    try{
        const teacher = await Teacher.findOne({
            $or:[{email:email}]
        })
        if(!teacher){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "Contrasena incorrecta"
            })
        }
        const validPassword = await verify(teacher.password, password)
        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inalvidas",
                error: "Contrasena incorrecta"
            })

        }
        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: teacher.profilePicture
            }
        })

    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })

    }
}


