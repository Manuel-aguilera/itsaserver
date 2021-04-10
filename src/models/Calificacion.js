import {Schema, model } from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const calificacionesSchema = new Schema({
    id_user: {
        type: String,
        default: "",
    },
    periodo: {
        type: String,
        default: "",
    },
    claveMateria: {
        type: String,
        default: "",
    },
    materia: {
        type: String,
        default: "",
    },
    unidades: {
        type: String,
        default: "",
    },
    estado: {
        type: String,
        default: "",
    },
    unidad1: {
        type: String,
        default: "",
    },
    unidad2: {
        type: String,
        default: "",
    },
    unidad3: {
        type: String,
        default: "",
    },
    unidad4: {
        type: String,
        default: "",
    },
    unidad5: {
        type: String,
        default: "",
    },
    unidad6: {
        type: String,
        default: "",
    },
    unidad7: {
        type: String,
        default: "",
    },
    unidad8: {
        type: String,
        default: "",
    },
    unidad9: {
        type: String,
        default: "",
    },
    unidad10: {
        type: String,
        default: "",
    },
    promedio: {
        type: String,
        default: "",
    },
    opc: {
        type: String,
        default: "",
    },
    aprobadas: {
        type: String,
        default: "",
    },
    tipoCurso: {
        type: String,
        default: "",
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Calificacion', calificacionesSchema)