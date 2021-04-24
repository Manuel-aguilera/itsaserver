import User from '../models/User';
import TemporaryUser from '../models/TemporaryUser';
import Documento from '../models/Documento';
import Periodo from '../models/Periodo';
import Carrera from '../models/Carrera';
import DepositosBancario from '../models/DepositosBancario';

const ESTADOINSC = ["Ficha no aceptada", "Ficha aceptada", "Deposito no aprobado", "Ficha finalizada", "Ficha rechazada"];
const FICHA = {
    "Contador publico":"FICHA DE ADMISIÓN CONTADOR PUBLICO",
    "Ingenieria Civil": "FICHA DE ADMISIÓN INGENIERIA  CIVIL",
    "ingenieria en Gestión Empresarial": "FICHA DE ADMISIÓN INGENIERIA EN GESTION EMPRESARIAL",
    "Ingenieria en Innovación Agricola Sustentable":"FICHA DE ADMISION ING. EN INNOVACION AGRICOLA SUSTENTABLE",
    "Ingenieria en Sistemas Computacionales": "FICHA DE ADMISIÓN ING. EN SISTEMAS COMPUTACIONALES",
    "Ingenieria Bioquimica": "FICHA DE ADMISIÓN INGENIERIA BIOQUIMICA",
    "Ingenieria Informatica":"FICHA DE ADMISIÓN INGENIERIA  INFORMATICA",
    "Ingenieria Industrial":"FICHA DE ADMISIÓN INGENIERIA  INDUSTRIAL",
}
const ESTADOPAGO = ["revisión", "aceptado", "foto rechazada", "rechazado", "finalizado", "cancelado"];

//movil
export const createUser = async (req, res) => {
    try{
        if(!req.body)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "Debes ingresar el nombre, correo y token de temporaryuser"
            })
        const email = req.body.emailPersonal; 
        const isMatriculado = /al/;
        const isInstitucional = /itsa.edu.mx/;
        if(isInstitucional.test(email)){  //Es institucional por lo tanto ya está registrado en la tabla de usuarios
            if(isMatriculado.test(email)){  //Tiene matrícula por lo que concluimos que es un alumno
                const correo = email.split("@");
                const dominio = correo[1];
                const matricula = correo[0].split("al")[1];
                //obtenemos el usuario institucinial y lo devolvemos
                const dataUser = await User.find({
                    "datosAlumno.matricula": matricula
                });
                if(dataUser.length > 0)
                    res.json({
                        data: dataUser,
                        status: "alumno",
                        message: "Datos del alumno"
                    });
                else  //no existe ese alumno institucional
                    res.json({
                        data: [],
                        status: "noalumno",
                        message: "No existe el alumno"
                    });                
            }
            else
                res.json({
                    data: [],
                    status: "docente",
                    message: "Datos del docente"
                });
        }
        else{  //No es un correo institucional
            //Validamos que ya esté registrado si es así devolvemos su sesión
            const dataUser = await TemporaryUser.find({emailPersonal: req.body.emailPersonal});
            if(dataUser.length > 0) //ya existe lo devolvemos
                res.json({
                    data: dataUser,
                    status: "alumnoincripcion",
                    message: "alumnoincripcion creado correctamente"
                });
            else{  //no existe ese alumno lo creamos porque cumple con los requisitos 
                    //tambien le creamos para que suba los documentos 
                const newUser = new TemporaryUser({
                    usuario: req.body.usuario, 
                    emailPersonal: req.body.emailPersonal,
                    tokenN: req.body.tokenN,
                });
                const usersave = await newUser.save();
                const newDocumento = new Documento({
                    id_user: usersave._id,
                    observaciones: "Alumno en proceso de inscripción",
                    curpFoto: {
                        image: {
                            originalname: "",
                            filename: "",
                            path: "",
                        } 
                    },
                    actaFoto: {
                        image: {
                            originalname: "",
                            filename: "",
                            path: "",
                        } 
                    },
                    certificadoBach: {
                        image: {
                            originalname: "",
                            filename: "",
                            path: "",
                        } 
                    },
                    constanciaMedica: {
                        image: {
                            originalname: "",
                            filename: "",
                            path: "",
                        } 
                    }
                });
                const doc = await newDocumento.save();
                //en el futuro corregir las referencias para eliminar la variable id_user ya que no es optimo
                //y usar ref
                await TemporaryUser.findByIdAndUpdate(usersave._id, {documento: doc._id});
                res.json({
                    data: usersave,
                    status: "alumnoincripcion",
                    message: "alumnoincripcion creado correctamente"
                })
            }
        }
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
        });
    }
}

export const updateUser = async (req, res) => {
    if(!req.query)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del usuario temporaryuser"
        })
    if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar datos en el cuerpo temporaryuser"
        })
        
    const { id } = req.query;
    try{
        const updatedUser = await TemporaryUser.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({  
            data: updatedUser,
            status: 'success',
            message: 'El usuario fue actualizado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'internalError',
            message: `Error actualizando el usuario con el id: ${id}`,
        });
    }
}

//web
export const getAlumnosInscripciones = async (req, res) => {
    //para resolver esto debemos usar populate, con eso poblas  los datos sin necesidad de hacer consultas complejas
    try{
        const users = await TemporaryUser.find().populate(["documento", "deposito"]);        
        if(!users) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `No hay usuarios para mostrar calificaciones`
        })
        
        res.json({
            data: users,
            status: "success",
            message: "Usarios sin poblar"
        });
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: "failed",
            message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
        });
    }
}

export const deleteUser = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el _id del usuario temporaryuser"
        })
    const { id } = req.params;
    try{
        const userData = await TemporaryUser.findByIdAndDelete(id)
        res.json({
            data: userData,
            status: 'success',
            message: 'El usuario fue eliminado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado un usuario con el id: ${id}`,
        });
    }
}

export const findOneUser = async (req, res) => {
    if(!req.query)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del usuario a buscar en temporaryuser"
        })
    const { id } = req.query;
    try{
        const user = await TemporaryUser.findById(id);

        if(!user) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `El usuario con el id: ${id} no existe`
        })

        res.json({
            data: user,
            status: "success",
            message: `El usuario fue encontrado en la tabla temporaryusers`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo una tarea con el id: ${id}`,
        });
    }
}

export const updateEstadoInscripcion = async (req, res) => {
    try{
        if(!req.params)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "No has ingresado el id del alumno inscripcion"
            })
        if(!req.body)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "No has ingresado el valor para estadoInsc"
            })
        const { id } = req.params;
        let dataTemporaryUser = null;
        if(ESTADOINSC[1] === req.body.estadoInsc) //"Ficha aceptada" debemos crear los depositos bancarios
        { 
            let ficha = FICHA[req.body.carrera];
            const temporaryUser = await TemporaryUser.findById(id);
            if(temporaryUser.deposito.length > 0){
                dataTemporaryUser = await TemporaryUser.findByIdAndUpdate(id, {
                    estadoInsc: req.body.estadoInsc, 
                    observaciones:  req.body.observaciones,
                }, {
                    useFindAndModify: false
                });
            }else {
                //extraemos el ultimo periodo, ya existe una ruta llamada periodos/ultimo pero aqui ponemos la logica ya que estamos simulando
                const periodo = await Periodo.find({},{_id: 0}).sort({"periodo":-1});
                const listaPeriodos = Object.entries(periodo);
                let ultimoPeriodo = listaPeriodos[0][1].periodo;

                let folioPago = getFolioPago();
                let rf = await getReferenciaBancaria(); 
                let referenciaBancaria = `${rf}${folioPago}`;

                const newDepositoFicha = new DepositosBancario({
                    id_user: id,
                    usuario: temporaryUser.usuario,
                    tipoPago: "fichas",
                    concepto: ficha,
                    cantidad: 1,
                    costo: "1200",
                    importe: "1200",
                    NControlCurp: temporaryUser.curp,
                    folioInterno: folioPago,
                    referenciaBancaria: referenciaBancaria,
                    periodo: ultimoPeriodo,
                    convenioCIE: "001770500",
                    observaciones: req.body.observaciones,
                    estadoPago: ESTADOPAGO[0], //el 0 es revision
                    fotoDeposito: {
                        image: {
                            originalname: "null",
                            filename: "null",
                            path: "null",
                        },
                    },
                    fecha: `${new Date(Date.now())}`,
                    fechaCaducidad: `${new Date(Date.now())}`,
                });
                const depositosFichaSave = await newDepositoFicha.save();
                
                let folioPago2 = getFolioPago();
                let rf2 = await getReferenciaBancaria(); 
                let referenciaBancaria2 = `${rf2}${folioPago2}`;

                const newDepositoAportacion = new DepositosBancario({
                    id_user: id,
                    usuario: temporaryUser.usuario,
                    tipoPago: "inscripcion",
                    concepto: "APORTACIÓN PARA EL FORTALECIMIENTO INSTITUCIONAL NUEVO INGRESO",
                    cantidad: 1,
                    costo: "1000",
                    importe: "1000",
                    NControlCurp: temporaryUser.curp,
                    folioInterno: folioPago2,
                    referenciaBancaria: referenciaBancaria2,
                    periodo: ultimoPeriodo,
                    convenioCIE: "001770500",
                    observaciones: req.body.observaciones,
                    estadoPago: ESTADOPAGO[0], //el 0 es revision
                    fotoDeposito: {
                        image: {
                            originalname: "null",
                            filename: "null",
                            path: "null",
                        },
                    },
                    fecha: `${new Date(Date.now())}`,
                    fechaCaducidad: `${new Date(Date.now())}`,
                });
                const depositoAportacionSave = await newDepositoAportacion.save(); 
                dataTemporaryUser = await TemporaryUser.findByIdAndUpdate(id, {
                    estadoInsc: req.body.estadoInsc,  
                    deposito: [depositosFichaSave, depositoAportacionSave],
                    observaciones:  req.body.observaciones,
                }, {
                    useFindAndModify: false
                });
            }
        } else {
            dataTemporaryUser = await TemporaryUser.findByIdAndUpdate(id, {
                estadoInsc: req.body.estadoInsc,  
                observaciones:  req.body.observaciones,
            }, {
                useFindAndModify: false
            });
        }

        if(ESTADOINSC[3] === req.body.estadoInsc){
            const temporaryUser = await TemporaryUser.findById(id);
            // console.log(temporaryUser)
            if(temporaryUser.deposito.length > 0){
                console.log("if")
                dataTemporaryUser = await TemporaryUser.findByIdAndUpdate(id, {
                    estadoInsc: req.body.estadoInsc, 
                    observaciones:  req.body.observaciones,
                }, {
                    useFindAndModify: false
                });
            }  
            else {
                console.log("else")
                let matricula = await getMatricula();
                const email = `al${matricula}@itsa.edu.mx`;
                const usuario = `${req.body.datosAlumno.nombre} ${req.body.datosAlumno.apellidoPaterno} ${req.body.datosAlumno.apellidoMaterno}`;
                const planEstudios = await Carrera.findOne({carrera: temporaryUser.carrera});
                const newUser = new User({
                    id_temporaryUser: id,
                    datosAlumno: {
                        fichaAceptada: true,
                        pagoInscripcion: true,
                        usuario: usuario,
                        nombre: temporaryUser.nombre,
                        apellidoPaterno: temporaryUser.apellidoPaterno,
                        apellidoMaterno: temporaryUser.apellidoMaterno,
                        tipoAlta: "inscripción",
                        estadoAlumno: "vigente",
                        carrera: temporaryUser.carrera,
                        fechaNacimiento: (temporaryUser.fechaNacimiento) ? temporaryUser.fechaNacimiento : 'No especificado',
                        curp: temporaryUser.curp,
                        sexo: temporaryUser.sexo,
                        matricula: matricula,
                        anioIngreso: new Date(Date.now()).getFullYear(),
                        tipoAlumno: "regular",
                        sexo: temporaryUser.sexo,
                        planEstudios: planEstudios.planEstudios,
                    },
                    datosGenerales: {
                        email: email,
                        fechaAlta: new Date(Date.now()),
                        estado: temporaryUser.estado,
                        municipio:temporaryUser.municipio,
                        poblacion:temporaryUser.poblacion,
                        colonia:temporaryUser.colonia,
                        direccion:temporaryUser.direccion,
                        numero:temporaryUser.numero,
                        cp:temporaryUser.cp,
                        telefono1:temporaryUser.telefono1,
                        telefono2:temporaryUser.telefono2,
                        emailPersonal:temporaryUser.emailPersonal,
                    },
                    procedencia: {
                        bachillerato: "",
                        especialidad: "",
                        anioEgreso: "",
                        promedio: ""
                    },
                    datosFamiliares: {
                        padres: {
                            padre: {
                                nombre: "",
                                vive: false,
                                celular: ""
                            },
                            madre: {
                                nombre: "",
                                vive: false,
                                celular: ""
                            }
                        }  
                    },
                    situacionActual: {
                        semestre: "1",
                        grupo: "A",
                        cargaMaxima: "32",
                        cargaMinima: "24",
                        creditosAprobados: "250",
                        promedioConReprobadas: "0.0",
                        promedioSinReprobadas: "0.0",
                        motivoBaja: "",
                        periodosMaximos: "12",
                        inscrito: "true",
                        fechaBajaDefinitiva: "",   
                        turno:temporaryUser.turno,          
                    },
                    expedientes: {
                        residencias: {  
                            expediente: "RESIDENCIA LIBERADA",
                            liberado: false
                        },        
                        acta: {  
                            expediente: "ACTA DE NACIMIENTO ORIGINAL",
                            liberado: false
                        },        
                        certificado: {  
                            expediente: "CERTIFICADO DE BACHILLERATO LEGALIZADO",
                            liberado: false
                        },        
                        curp: {  
                            expediente: "COPIA DE LA CURP",
                            liberado: false
                        },        
                        ingles: {  
                            expediente: "ACREDITACIÓN DE INGLES",
                            liberado: false
                        },        
                        constanciaNoAdeudo: {  
                            expediente: "CONSTANCIA DE NO ADEUDO",
                            liberado: false
                        },        
                        fotografias: {  
                            expediente: "FOTOGRAFIAS (2 T/DIPLOMA Y 8 T/CREDENCIAL OVALADA)",
                            liberado: false
                        },        
                        servicioSocial: {  
                            expediente: "SERVICIO SOCIAL",
                            liberado: false
                        },        
                        pagoTitulacion: {  
                            expediente: "RECIBO DE PAGO DE TITULACIÓN",
                            liberado: false
                        },        
                        ine: {  
                            expediente: "COPIA DEL INE",
                            liberado: false
                        },        
                        vigenciaDerecho: {  
                            expediente: "VIGENCIA DE DERECHO",
                            liberado: false
                        }      
                    },
                });

                const usersave = await newUser.save();
                dataTemporaryUser = await TemporaryUser.findByIdAndUpdate(id, {
                    estadoInsc: req.body.estadoInsc, 
                    observaciones:  req.body.observaciones,
                }, {
                    useFindAndModify: false
                });
            }
            
        }

        res.json({
            data: dataTemporaryUser,
            status: 'success',
            message: 'La DepositosBancario creados exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizada la DepositosBancario con el id: ${id}`,
        });
    }
}

export const getUserApp = async (req, res) => {
    if(!req.query)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del usuario a buscar en temporaryuser"
        })
    const { id } = req.query;
    try{
        const user = await User.findOne({id_temporaryUser:id});
        if(!user) 
            return res.json({
                data: user,
                status: "notfound",
                message: `El usuario con el id: ${id} no existe`
            })
        const data = {
            usuario: user.datosGenerales.usuario,
            matricula: user.datosAlumno.matricula,
            email: user.datosGenerales.email,
            semestre: user.situacionActual.semestre,
            carrera: user.datosAlumno.carrera,
            turno: user.situacionActual.turno,
        }

        res.json({
            data: data,
            status: "success",
            message: `El usuario fue encontrado en la tabla temporaryusers`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo una tarea con el id: ${id}`,
        });
    }
} 

const getFolioPago = () => {
    return `${Date.now()}`;
}

const getReferenciaBancaria = async () => {
    let patron = await getPatron();
    return `N${patron}F`;
    // console.log(`A${matricula}F${Date.now()}`);
}

const getPatron = async () => {
    const date = new Date(Date.now());
    let year = `${date.getFullYear()}`;
    let anio = year.slice(2,4);
    const users = await User.find();
    let numSig = users.length + 1;
    let matricula = `${anio}02${zeroFill(numSig, 4)}`;
    return matricula;
}
const zeroFill = ( number, width ) => { // example zeroFill(324, 4)
    width -= number.toString().length;
    if ( width > 0 )
    {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // siempre devuelve tipo cadena
  }