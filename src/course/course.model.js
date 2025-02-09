import { Schema, model } from "mongoose";

const courseSchema = Schema({

    name: {
        type: String,
        required: [true, "Course name is required"],
        unique: true,
        maxLength: [25, "Name course cannot exceed 25 characters"]
    },

    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A teacher is required"]
    },
    
    student: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

// Middleware para eliminar la referencia del curso en los estudiantes cuando se elimina un curso
courseSchema.pre("findOneAndDelete", async function (next) {
    const courseId = this.getQuery()._id;

    await model("User").updateMany(
        { courses: courseId },
        { $pull: { courses: courseId } }
    );

    next();
});

export default model("Course", courseSchema);
