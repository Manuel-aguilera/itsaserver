import User from '../models/User';

export const findAllUsers = async (req, res) => {
    try{
        const data = await User.find();
        res.json({
            data: data,
            status: "success",
            message: "lista de users"
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

export const createUser = async (req, res) => {
    try{
        if(!req.body){
            return res.status(404).send({
                data: [],
                status: 'failed',
                message: "No hay datos suficientes para crear el usuario"
            })
        }
        
        const matricula = await getMatricula();
        const email = `al${matricula}@itsa.edu.mx`;

        const newUser = new User({
            datosAlumno: {
                usuario: req.body.usuario,
                matricula: matricula,
                nombre: req.body.nombre,
                apellidoPaterno: req.body.apellidoPaterno,
                apellidoMaterno: req.body.apellidoMaterno,
                tipoAlta: req.body.tipoAlta,
                estadoAlumno: req.body.estadoAlumno,
                carrera: req.body.carrera,
                fechaNacimiento: req.body.fechaNacimiento,
                curp: req.body.curp,
                sexo: req.body.sexo,
                anioIngreso: new Date(Date.now()).getFullYear(),
                tipoAlumno: req.body.tipoAlumno,
                planEstudios: req.body.planEstudios,
                //campos extra de control  
                tokenN: req.body.tokenN,
                fichaAceptada: req.body.fichaAceptada,
                pagoInscripcion: req.body.pagoInscripcion,
            },
            datosGenerales: {
                estado: req.body.estado,
                municipio: req.body.municipio,
                poblacion: req.body.poblacion,
                colonia: req.body.colonia,
                direccion: req.body.direccion,
                numero: req.body.numero,
                cp: req.body.cp,
                telefono1: req.body.telefono1,
                telefono2: req.body.telefono2,
                email: email,
                emailPersonal: req.body.emailPersonal,
                fechaAlta: new Date(Date.now()),
            },
            procedencia: {
                bachillerato: req.body.bachillerato,
                especialidad: req.body.especialidad,
                anioEgreso: req.body.anioEgreso,
                promedio: req.body.promedio,
            },
            datosFamiliares: {
                padres: {
                    padre: {
                        nombre: req.body.nombre,
                        vive: req.body.vive,
                        celular: req.body.celular,
                    },
                    madre: {
                        nombre: req.body.nombre,
                        vive: req.body.vive,
                        celular: req.body.celular,
                    },
                }
            },
            situacionActual: {
                semestre: req.body.semestre,
                grupo: req.body.grupo,
                cargaMaxima: req.body.cargaMaxima,
                cargaMinima: req.body.cargaMinima,
                creditosAprobados: req.body.creditosAprobados,
                promedioConReprobadas: req.body.promedioConReprobadas,
                promedioSinReprobadas: req.body.promedioSinReprobadas,
                motivoBaja: req.body.motivoBaja,
                periodosMaximos: req.body.periodosMaximos,
                inscrito: req.body.inscrito,
                fechaBajaDefinitiva: req.body.fechaBajaDefinitiva,   
                turno: req.body.turno,   
            },
            expedientes: {
                residencias: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                acta: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                certificado: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                curp: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                ingles: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                constanciaNoAdeudo: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                fotografias: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                servicioSocial: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                pagoTitulacion: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                ine: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                vigenciaDerecho: {  
                    expediente: req.body.expediente,
                    liberado: req.body.liberado,
                },        
                
            },
        });

        const usersave = await newUser.save();
        res.json({
            data: usersave,
            status: "success",
            message: "Usuario creado correctamente"
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
        });
    }
}

export const findOneUser = async (req, res) => {
    try{
        if(!req.params){
            return res.status(404).send({
                data: [],
                status: 'failed',
                message: "Debes ingresar el id para buscar el usuario"
            })
        }
        const { id } = req.params;
        
        const user = await User.findById(id);
        if(!user) 
            return res.status(404).json({
                data: [],
                status: 'failed',
                message: `El usuario con el id: ${id} no existe`
            }) 
        else {
            res.json({
                data: user,
                status: 'success',
                message: "El usuario fue encontrado con éxito"
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo una tarea con el id: ${id}`,
        });
    }
}

export const deleteUser = async (req, res) => {
    try{
        if(!req.params){
            return res.status(404).send({
                data: [],
                status: 'failed',
                message: "Debes ingresar el id para el usuario a eliminar"
            })
        }
        const { id } = req.params;
        await User.findByIdAndDelete(id)
        res.json({
            data: [],
            status: 'success',
            message: 'Usuario ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || `Error eliminado un usuario con el id: ${id}`,
        });
    }
}

export const updateUser = async (req, res) => {
    try{
        if(!req.body){
            return res.status(404).send({
                data: [],
                status: 'failed',
                message: "No hay datos para actualizar el usuario"
            })
        }
        if(!req.query){
            return res.status(404).send({
                data: [],
                status: 'failed',
                message: "Debes ingresar el id para el usuario a actualizar"
            })
        }
        const { id } = req.query;

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
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
            message: error.message || `Error actualizando el usuario con el id: ${id}`,
        });
    }
}

const getMatricula = async () => {
    const date = new Date(Date.now());
    let year = `${date.getFullYear()}`;
    let anio = year.slice(2,4);
    const users = await User.find();
    let numSig = users.length + 1;
    let matricula = `${anio}02${zeroFill(numSig, 4)}`;
    return matricula;
}

// export const createNewUser = async (req, res) => {
//     try{
//         const ep = req.body.emailPersonal; //institucional
//         const email = req.body.email; //tuyo

//         const correo = ep.split("@");
//         const dominio = correo[1];
//         const matricula = correo[0].split("al")[1];

//         const newUser = new User({
//             usuario: req.body.usuario, 
//             tokenN: req.body.tokenN,
//             emailPersonal: email,
//             email: ep,
//             matricula: matricula,
//         });
//         const usersave = await newUser.save();
//         res.json({
//             data: usersave,
//             status: "alumno",
//             message: "alumno creado correctamente"
//         })
//     }
//     catch(error){
//         res.status(500).json({
//             data: [],
//             status: "failed",
//             message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
//         });
//     }
// }