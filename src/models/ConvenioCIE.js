import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const convenioCIESchema = new Schema({
    convenioCIE: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('ConvenioCIE', convenioCIESchema)