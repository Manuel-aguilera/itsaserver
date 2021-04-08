import {Schema, model } from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const calificacionesSchema = new Schema({
    id_user: {
        type: String,
    },
    periodo: {
        type: String,
    },
    claveMateria: {
        type: String,
    },
    materia: {
        type: String,
    },
    unidades: {
        type: String,
    },
    estado: {
        type: String,
    },
    unidad1: {
        type: String,
    },
    unidad2: {
        type: String,
    },
    unidad3: {
        type: String,
    },
    unidad4: {
        type: String,
    },
    unidad5: {
        type: String,
    },
    unidad6: {
        type: String,
    },
    unidad7: {
        type: String,
    },
    unidad8: {
        type: String,
    },
    unidad9: {
        type: String,
    },
    unidad10: {
        type: String,
    },
    promedio: {
        type: String,
    },
    opc: {
        type: String,
    },
    aprobadas: {
        type: String,
    },
    tipoCurso: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('Calificacion', calificacionesSchema)