import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const temporaryUserSchema = new Schema({
    documento: { 
        type: Schema.Types.ObjectId, 
        ref: 'Documento'
    },
    deposito: [
        {
            ref: "DepositosBancario",
            type: Schema.Types.ObjectId,
        }
    ],
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
    turno: {
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
        type: String,
    },
    cp: {
        type: String,
    },
    telefono1: {
        type: String,
    },
    telefono2: {
        type: String,
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