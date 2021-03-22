import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const temporaryUserSchema = new Schema({
    usuario: {
        type: String,
        trim: true,
    },
    nombre: {
        type: String,
        trim: true,
    },
    apellidoPaterno: {
        type: String,
        trim: true,
    },
    apellidoMaterno: {
        type: String,
        trim: true,
    },
    carrera: {
        type: String,
        trim: true,
    },
    fechaNacimiento: {
        type: Date,
    },
    sexo: {
        type: String,
        trim: true,
    },
    curp: {
        type: String,
        trim: true,
    },
    estado: {
        type: String,
        trim: true,
    },
    municipio: {
        type: String,
        trim: true,
    },
    poblacion: {
        type: String,
        trim: true,
    },
    colonia: {
        type: String,
        trim: true,
    },
    direccion: {
        type: String,
        trim: true,
    },
    numero: {
        type: Number,
    },
    cp: {
        type: Number,
    },
    telefono1: {
        type: Number,
    },
    telefono2: {
        type: Number,
    },
    emailPersonal: {
        type: String,
        trim: true,
    },
    //campos de registro a la app
    tokenN: {
        type: String,
        trim: true,
    },
    matricula: {
        type: Number,
    },
    planEstudios: {  //
        type: String,
    },
    fichaAceptada: {  
        type: Boolean,
        default: false,
    },
    pagoInscripcion: {
        type: Boolean,
        default: false,
    }

}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('TemporaryUser', temporaryUserSchema)