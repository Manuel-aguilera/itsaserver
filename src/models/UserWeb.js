import { Schema, model } from 'mongoose';

const userWebSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
    }]
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
});

export default model("UserWeb", userWebSchema);