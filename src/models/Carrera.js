import {Schema, model} from 'mongoose';

const carrerasSchema = new Schema({
    carrera: {
        type: String,
    },
    planEstudios: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Carrera', carrerasSchema)