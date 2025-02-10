import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        unique: true,
        maxLength: [25, "Course name cannot exceed 25 characters"]
    },
    
    // Maestro que imparte el curso
    
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: [true, "A teacher must be assigned"]
    },

    // estudiantes asignados al curso

    students: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    //createdAt y updatedAt
    timestamps: true
});

export default model("Course", courseSchema)