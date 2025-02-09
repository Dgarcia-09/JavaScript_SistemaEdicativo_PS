import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        unique: true,
        maxLength: [25, "Course name cannot exceed 25 characters"]
    },
    
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: [true, "A teacher must be assigned"]
    },
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
    timestamps: true
});

export default model("Course", courseSchema)