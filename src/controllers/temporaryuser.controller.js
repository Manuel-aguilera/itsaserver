import User from '../models/User';
import TemporaryUser from '../models/TemporaryUser';

export const findAllUsers = async (req, res) => {
    try{
        const data = await TemporaryUser.find();
        res.json({
            data: data,
            status: "success",
            message: "Usarios de temporaryuser"
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
        });
    }
}

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
            //Validamos que ya esté registrado si es así devolvemos su sesión
            const dataUser = await TemporaryUser.find({emailPersonal: req.body.emailPersonal});
            if(dataUser.length > 0) //ya existe lo devolvemos
                res.json({
                    data: dataUser,
                    status: "alumnoincripcion",
                    message: "alumnoincripcion creado correctamente"
                });
            else{  //no existe ese alumno lo creamos porque cumple con los requisitos
                const newUser = new TemporaryUser({
                    usuario: req.body.usuario, 
                    emailPersonal: req.body.emailPersonal,
                    tokenN: req.body.tokenN,
                });
                const usersave = await newUser.save();
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

export const findOneUser = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del usuario a buscar en temporaryuser"
        })
    const { id } = req.params;
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

export const updateUser = async (req, res) => {
    console.log("body")
    console.log(req.body)
    console.log("params")
    console.log(req.params)
    if(!req.params)
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
        
    const { id } = req.params;
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

