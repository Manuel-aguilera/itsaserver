import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const conceptoDocumentosSchema = new Schema({
    id_TipoPago: {
        type: String,
        required: true,
        trim: true,
    },
    concepto: {
        type: String,
        required: true,
        trim: true,
    },
    costo: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('ConceptoDocumento', conceptoDocumentosSchema)