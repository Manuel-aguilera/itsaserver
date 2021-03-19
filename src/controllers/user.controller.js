import User from '../models/User';
import TemporaryUser from '../models/TemporaryUser';

export const findAllUsers = async (req, res) => {
    try{
        let matricula = null;
        if (!req.query){
            matricula = req.query.matricula;
        }

        const data = await TemporaryUser.find(matricula);
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los usuarios",
        });
    }
}

export const createUser = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.fullName || !req.body.email || !req.body.tokenN){
        return res.status(404).send({
            message: "El title o description  no puede ser vacío en el body"
        })
    }
    
    try{
        //vamos a comprobar si ya existía este usuario
        const em = req.body.email;
        console.log(em);
        const dataUser = await TemporaryUser.find({email: em});
        console.log('DataUser');
        console.log(dataUser);
        if(dataUser.length !== 0){
            res.json({message: "El usuario ya existe"});
        } else {
            //generamos una matricula en base al correo
            let matricula = em.slice(2, 10);
            

            const newUser = new TemporaryUser({
                fullName: req.body.fullName, 
                email: req.body.email,
                tokenN: req.body.tokenN,
                matricula: matricula,   
            });
            const usersave = await newUser.save();
            res.json(usersave)
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
        const user = await TemporaryUser.findById(id);

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
        await TemporaryUser.findByIdAndDelete(id)
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
//         const users = await TemporaryUser.find({done: true});
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
    if(!req.body.fullName || !req.body.email || !req.body.tokenN){
        return res.status(404).send({
            message: "El title no puede ser vacío en el body"
        })
    }
    try{
        const updatedUser = await TemporaryUser.findByIdAndUpdate(id, req.body, {
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

