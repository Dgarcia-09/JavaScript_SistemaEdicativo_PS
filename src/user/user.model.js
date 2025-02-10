import { Schema, model} from "mongoose";

const userSchema = Schema({

    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },

    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },

    profilePicture:{
        type: String
    },


    role:{
        type: String,
        required: true,
        default: "STUDENT_ROLE",
        inmutable:true
    },
    
    status:{
        type: Boolean,
        default: true
    },

    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },]
    },

{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)