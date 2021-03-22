import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const tipoPagosSchema = new Schema({
    tipoPago: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('TipoPago', tipoPagosSchema)