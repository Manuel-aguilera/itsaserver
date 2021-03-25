import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const periodosSchema = new Schema({
    periodo: {
        type: String,
        trim: true,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Periodo', periodosSchema)