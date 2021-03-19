import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const temporaryUserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    tokenN: {
        type: String,
        required: true,
        trim: true,
    },
    matricula: {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('TemporaryUser', temporaryUserSchema)