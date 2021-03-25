import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const descargasSchema = new Schema({
    id_user: {
        type: String,
        trim: true,
    },
    nombre: {
        type: String,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    archivo: {
        originalname: {type: String},
        filename: {type: String},
        path: {type: String},
    } 

}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Descarga', descargasSchema)