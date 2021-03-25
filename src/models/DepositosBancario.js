import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const depositosBancariosSchema = new Schema({
    id_user: {
        type: String,
        trim: true,
    },
    usuario:{
        type: String,
        trim: true,
    },
    tipoPago: {  //tipo de documento
        type: String,
        trim: true,
    },
    concepto: {   //difentes tipos para ese documento
        type: String,
        trim: true,
    },
    cantidad: {
        type: Number,
    },
    costo: {
        type: Number,
    },
    importe: {
        type: Number,
    },
    NControlCurp: {
        type: Number,
    },
    folioInterno: {
        type: String,
        trim: true,
    },
    convenioCIE: {
        type: String,
        trim: true,
    },
    referenciaBancaria: {
        type: String,
        trim: true,
    },
    periodo: {
        type: String,
        trim: true,
    },
    fecha: {
        type: Date,
    },
    fechaCaducidad: {
        type: Date,
    },
    observaciones: {
        type: String,
        trim: true,
    },
    fotoComprobante: {
        originalname: {type: String},
        filename: {type: String},
        path: {type: String},
    }

}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('DepositosBancario', depositosBancariosSchema)