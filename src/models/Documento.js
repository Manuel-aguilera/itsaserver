import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const documentosSchema = new Schema({
    id_user: {
        type: String,
        required: true,
        trim: true,
    },
    curpFoto: {
        type: Binary,
        required: true,
    },
    actaFoto: {
        type: Binary,
        required: true,
    },
    certificadoBach: {
        type: Binary,
        required: true,
    },
    constanciaMedica: {
        type: Binary,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Documento', documentosSchema)