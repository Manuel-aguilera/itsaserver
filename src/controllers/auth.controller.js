import UserWeb from '../models/UserWeb';
import Role from '../models/Role';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signup = async (req, res) => {
    try{

        let { username, email, password, roles } = req.body;

        let rol = [];
        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}});
            rol = foundRoles.map(role => role._id);
        } else {
            const foundRoles = await Role.findOne({name: "user"});
            rol = [foundRoles._id];
            roles = ["user"];
        }
        
        const newUserWeb = new UserWeb({
            username,
            email,
            password: await encryptPassword(password),
            roles: rol,
        })

        const savedUser = await newUserWeb.save();
        
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 3600 //1 hora
        })
        
        res.json({
            data: [{
                username,
                email,
                roles
            }],
            status: "success",
            token: token,
            message: "Usuario creado correctamente",
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: "failed",
            token: null,
            message: error.message,
        })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await UserWeb.findOne({email}).populate("roles");
        
        if(!userFound)
            return res.json({
                data: [],
                status: "failed",
                token: null,
                message: "El usuario no fue encontrado",
            })

        const matchPassword = await comparePassword(password, userFound.password);

        if(!matchPassword)
            return res.json({
                data: [],
                status: "failed",
                token: null,
                message: "Contraseña inválida",
            })

        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 3600
        })

        const roles = userFound.roles.map(role => role.name);

        res.json({
            data: [{
                username: userFound.username,
                email: userFound.email,
                roles
            }],
            status: "success",
            token: token,
            message: "Usuario devuelto correctamente",
        })
    } catch (error) {
        res.status(500).json({
            data: [],
            status: "failed",
            token: null,
            message: error.message,
        })
    }
}

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
        
        let matricula = '';
        if(req.body.datosAlumno.matricula)
        {
            matricula = req.body.datosAlumno.matricula;
        } else {
            matricula = await getMatricula();
        }
        const email = `al${matricula}@itsa.edu.mx`;
        const usuario = `${req.body.datosAlumno.nombre} ${req.body.datosAlumno.apellidoPaterno} ${req.body.datosAlumno.apellidoMaterno}`;
        const newUser = new User({
            datosAlumno: {
                ...req.body.datosAlumno,
                usuario: usuario,
                matricula: matricula,
                anioIngreso: new Date(Date.now()).getFullYear(),
            },
            datosGenerales: {
                ...req.body.datosGenerales,
                email: email,
                fechaAlta: new Date(Date.now()),
            },
            procedencia: {
                ...req.body.procedencia
            },
            datosFamiliares: {
                ...req.body.datosFamiliares    
            },
            situacionActual: {
                ...req.body.situacionActual       
            },
            expedientes: {
                ...req.body.expedientes  
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

const zeroFill = ( number, width ) => { // example zeroFill(324, 4)
    width -= number.toString().length;
    if ( width > 0 )
    {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // siempre devuelve tipo cadena
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);    
}

const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}