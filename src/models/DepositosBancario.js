import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const depositosBancariosSchema = new Schema({
    id_user: {
        type: String,
        required: true,
        trim: true,
    },
    usuario:{
        type: String,
        required: true,
        trim: true,
    },
    tipoPago: {  //tipo de documento
        type: String,
        required: true,
        trim: true,
    },
    concepto: {   //difentes tipos para ese documento
        type: String,
        required: true,
        trim: true,
    },
    cantidad: {
        type: Number,
    },
    costo: {
        type: Number,
        required: true,
    },
    importe: {
        type: Number,
        required: true,
    },
    NControlCurp: {
        type: Number,
        required: true,
    },
    folioInterno: {
        type: String,
        required: true,
        trim: true,
    },
    convenioCIE: {
        type: String,
        required: true,
        trim: true,
    },
    referenciaBancaria: {
        type: String,
        required: true,
        trim: true,
    },
    periodo: {
        type: String,
        required: true,
        trim: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    fechaCaducidad: {
        type: Date,
        required: true,
    },
    observaciones: {
        type: String,
        trim: true,
    },

}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('DepositosBancario', depositosBancariosSchema)