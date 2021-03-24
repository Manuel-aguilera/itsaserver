import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const documentosSchema = new Schema({
    id_user: {
        type: String,
        trim: true,
    },
    curpFoto: {
        image: {
            originalname: {type: String},
            filename: {type: String},
            path: {type: String},
        } 
    },
    actaFoto: {
        image: {
            originalname: {type: String},
            filename: {type: String},
            path: {type: String},
        } 
    },
    certificadoBach: {
        image: {
            originalname: {type: String},
            filename: {type: String},
            path: {type: String},
        } 
    },
    constanciaMedica: {
        image: {
            originalname: {type: String},
            filename: {type: String},
            path: {type: String},
        } 
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Documento', documentosSchema)