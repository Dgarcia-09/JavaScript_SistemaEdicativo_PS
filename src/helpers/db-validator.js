import User from "../user/user.model.js"
import Teacher from "../teacher/teacher.model.js"

export const emailExists = async(email = "") =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya ha sido registrado`)
    }
}

export const userExists = async(uid = "") =>{
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error(`El ID porporcionado no existe`)
    }
}

export const emailExistsT = async(email = "") =>{
    const existe = await Teacher.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya ha sido registrado`)
    }
}


export const userExistsT = async(mid = "") => {
    const existe = await Teacher.findById(mid)
    if(!existe){
        throw new Error(`El ID proporcionado no existe`)
    }
}