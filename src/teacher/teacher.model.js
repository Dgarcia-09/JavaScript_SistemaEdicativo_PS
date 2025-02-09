import {Schema,model} from "mongoose"
const teacherSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture: {
        type: String
    },
    role: {
        type: String,
        default: "TEACHER_ROLE",
        immutable: true
    },
    status: {
        type: Boolean,
        default: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
    }]
}, {
    versionKey: false,
    timestamps: true
});

teacherSchema.methods.toJSON = function() {
    const { password, _id, ...maestro } = this.toObject();
    maestro.mid = _id;
    return maestro;
};

export default model("Teacher", teacherSchema);