import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const documentosSchema = new Schema({
    id_user: {
        type: String,
        trim: true,
    },
    curpFoto: {
        image: {
            image: {type: String},
            fileName: {type: String},
            path: {type: String},
        } 
    },
    actaFoto: {
        image: {
            image: {type: String},
            fileName: {type: String},
            path: {type: String},
        } 
    },
    certificadoBach: {
        image: {
            image: {type: String},
            fileName: {type: String},
            path: {type: String},
        } 
    },
    constanciaMedica: {
        image: {
            image: {type: String},
            fileName: {type: String},
            path: {type: String},
        } 
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Documento', documentosSchema)