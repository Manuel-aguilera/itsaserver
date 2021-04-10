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
        type: String,
    },
    costo: {
        type: String,
    },
    importe: {
        type: String,
    },
    NControlCurp: {
        type: String,
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
    pagado: {
        type: Boolean,
        default: false,
    },
    procesado: {
        type: Boolean,
        default: false,
    },
    fotoDeposito: {
        image: {
            originalname: {type: String},
            filename: {type: String},
            path: {type: String},
        }
    },
    estadoPago: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('DepositosBancario', depositosBancariosSchema)