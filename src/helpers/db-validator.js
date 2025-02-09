import User from "../user/user.model.js"

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