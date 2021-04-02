import User from '../models/User';
import TemporaryUser from '../models/TemporaryUser';

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

export const createNewUser = async (req, res) => {
    try{
        const ep = req.body.emailPersonal; //institucional
        const email = req.body.email; //tuyo

        const correo = ep.split("@");
        const dominio = correo[1];
        const matricula = correo[0].split("al")[1];

        const newUser = new User({
            usuario: req.body.usuario, 
            tokenN: req.body.tokenN,
            emailPersonal: email,
            email: ep,
            matricula: matricula,
        });
        const usersave = await newUser.save();
        res.json({
            data: usersave,
            status: "alumno",
            message: "alumno creado correctamente"
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
        });
    }
}

export const createUser = async (req, res) => {
    //usar express-validator para validar
    // if(!req.body.fullName || !req.body.email || !req.body.tokenN){
    //     return res.status(404).send({
    //         message: "El fullName, email o tokenN no puede ser vacío en el body"
    //     })
    // }
    try{

        const em = req.body.email; //institucional
        const email = req.body.emailPersonal; //tuyo
        // const dataUser = await User.find({email: em});
        // console.log('DataUser');
        // console.log(dataUser);
        // if(dataUser.length !== 0){
        //     res.json({message: "El usuario ya existe"});
        // }
        //generamos una matricula en base al correo
        
        const isMatriculado = /al/;
        const isInstitucional = /itsa.edu.mx/;
        if(isInstitucional.test(em)){  //Es institucional por lo tanto ya está registrado en la tabla de usuarios
            if(isMatriculado.test(em)){  //Tiene matrícula por lo que concluimos que es un alumno
                const correo = em.split("@");
                const dominio = correo[1];
                const matricula = correo[0].split("al")[1];
                console.log(dominio)
                console.log(matricula)
                //logueamos al usuario institucional
                //obtenemos el usuario institucinial y lo devolvemos
                const dataUser = await User.find({matricula: matricula});
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
            const newUser = new User({
                usuario: req.body.usuario, 
                // nombre: req.body.nombre,
                // apellidoPaterno: req.body.apellidoPaterno,
                // apellidoMaterno: req.body.apellidoMaterno,
                // carrera: req.body.carrera, 
                // fechaNacimiento: req.body.fechaNacimiento,
                // sexo: req.body.sexo,
                // curp: req.body.curp,
                // estado: req.body.estado, 
                // municipio: req.body.municipio,
                // poblacion: req.body.poblacion,
                // colonia: req.body.colonia,
                // direccion: req.body.direccion, 
                // numero: req.body.numero,
                // cp: req.body.cp,
                // telefono1: req.body.telefono1,
                // telefono2: req.body.telefono2,
                emailPersonal: email,
                email: em,
                tokenN: req.body.tokenN,
                matricula: matricula,
                // estadoAlumno: req.body.estadoAlumno,
                // tipoAlumno: req.body.tipoAlumno,
                // tipoAlta: req.body.tipoAlta,
                // planEstudios: req.body.planEstudios,
                // fichaAceptada: req.body.fichaAceptada,   
                // pagoInscripcion: req.body.pagoInscripcion,
            });
            const usersave = await newUser.save();
            res.json(usersave)
            res.json({message: "No es institucional entonces creamos el usuario temporal"});
        }
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
        });
    }
}

export const findOneUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);

        if(!user) return res.status(404).json({
            message: `El usuario con el id: ${id} no existe`
        })

        res.json(user)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo una tarea con el id: ${id}`,
        });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        await User.findByIdAndDelete(id)
        res.json({
            message: 'Tarea ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado un usuario con el id: ${id}`,
        });
    }
}

// export const findAllDoneUser = async (req, res) => {
//     try{
//         const users = await User.find({done: true});
//         res.json(users);
//     }
//     catch(error){
//         res.status(500).json({
//             message: error.message || `Error encontrando los usuarios con done true`,
//         });
//     }
// }

export const updateUser = async (req, res) => {
    const { id } = req.params;
    // if(!req.body.fullName && !req.body.email && !req.body.tokenN){
    //     return res.status(404).send({
    //         message: "El title no puede ser vacío en el body"
    //     })
    // }
    try{
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'El usuario fue actualizado exitosamente',
            user: updatedUser
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el usuario con el id: ${id}`,
        });
    }
}

