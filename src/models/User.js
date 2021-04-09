import {Schema, model} from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema({
    id_temporaryUser: {
        type: String,
    },
    datosAlumno: {
        usuario: {
            type: String,
            trim: true,
        },
        matricula: {
            type: String,
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
        tipoAlta: {   //incripcion
            type: String,
        },
        estadoAlumno: {  //vigente
            type: String,
        },
        carrera: {
            type: String,
            trim: true,
        },
        fechaNacimiento: {
            type: Date,
        },
        curp: {
            type: String,
            trim: true,
        },
        sexo: {
            type: String,
            trim: true,
        },
        anioIngreso: {
            type: String,
        },
        tipoAlumno: {  //regular
            type: String,
        },
        planEstudios: {  //
            type: String,
        },
        //campos extra de control  
        tokenN: {
            type: String,
            trim: true,
        },
        fichaAceptada: {  
            type: Boolean,
            default: false,
        },
        pagoInscripcion: {
            type: Boolean,
            default: false,
        },
    },
    datosGenerales: {
        estado: {
            type: String,
        },
        municipio: {
            type: String,
        },
        poblacion: {
            type: String,
        },
        colonia: {
            type: String,
        },
        direccion: {
            type: String,
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
        email: {
            type: String,
        },
        emailPersonal: {
            type: String,
        },
        fechaAlta: {
            type: Date,
        },
    },
    procedencia: {
        bachillerato: {  
            type: String,
        },
        especialidad: {  
            type: String,
        },
        anioEgreso: {  
            type: String,
        },
        promedio: {  
            type: String,
        },
    },
    datosFamiliares: {
        padres: {
            padre: {
                nombre: {
                    type: String,
                },
                vive: {
                    type: Boolean,
                    default: true,
                },
                celular: {
                    type: String,
                },
            },
            madre: {
                nombre: {
                    type: String,
                },
                vive: {
                    type: Boolean,
                    default: true,
                },
                celular: {
                    type: String,
                },
            },
        }
    },
    situacionActual: {
        semestre: {  
            type: String,
        },
        grupo: {  
            type: String,
        },
        cargaMaxima: {  
            type: String,
        },
        cargaMinima: {  
            type: String,
        },
        creditosAprobados: {  
            type: String,
        },
        promedioConReprobadas: {  
            type: String,
        },
        promedioSinReprobadas: {  
            type: String,
        },
        motivoBaja: {  
            type: String,
        },
        periodosMaximos: {  
            type: String,
        },
        inscrito: {  
            type: String,
        },
        fechaBajaDefinitiva: {  
            type: String,
        },   
        turno: {  
            type: String,
        },   
    },
    expedientes: {
        residencias: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        acta: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        certificado: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        curp: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        ingles: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        constanciaNoAdeudo: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        fotografias: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        servicioSocial: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        pagoTitulacion: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        ine: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        vigenciaDerecho: {  
            expediente: {
                type: String,
            },
            liberado: {
                type: Boolean,
                default: false,
            }
        },        
        
    },
}, {
    versionKey: false,
    timestamps: true,  //para agregar creatAt y updateAt
})

export default model('User', userSchema)