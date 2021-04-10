import User from '../models/User';
import Calificacion from '../models/Calificacion';
import { response } from 'express';

export const createCalificacion = async (req, res) => {
    //usar express-validator para validar
    try{
        if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar los datos de la Calificacion"
        })
        
        let newCalificacion = '';
        if(Object.entries(req.body).length > 1) //hay mas datos y lo creamos
        {
            newCalificacion = new Calificacion({
                id_user: req.body.id_user,
                periodo: req.body.periodo,
                claveMateria: req.body.claveMateria,
                materia: req.body.materia,
                unidades: req.body.unidades,
                estado: req.body.estado,
                unidad1: req.body.unidad1,
                unidad2: req.body.unidad2,
                unidad3: req.body.unidad3,
                unidad4: req.body.unidad4,
                unidad5: req.body.unidad5,
                unidad6: req.body.unidad6,
                unidad7: req.body.unidad7,
                unidad8: req.body.unidad8,
                unidad9: req.body.unidad9,
                unidad10: req.body.unidad10,
                promedio: req.body.promedio,
                opc: req.body.opc,
                aprobadas: req.body.aprobadas,
                tipoCurso: req.body.tipoCurso,
            });
        } else { //lo mandaron el id_user
            newCalificacion = new Calificacion({
                id_user: req.body.id_user,
            });
        }

        const CalificacionSave = await newCalificacion.save();
        res.json({
            data: CalificacionSave,
            status: "success",
            message: "Calificacion creada exitosamente"
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos la Calificacion",
        });
    }
}

export const getUserCalificaciones = async (req, res) => {
    if(!req.query)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la Calificacion"
        })
    const { id } = req.query;
    try{
        const calificacion = await Calificacion.find({id_user: id});

        if(!calificacion) 
            return res.status(404).json({
               data: [],
               status: "notfound",
               message: `La Calificacion con el id: ${id} no existe`
            }) 
        else{
            res.json({
                data: calificacion,
                status: "success",
                message: `Las calificaciones fue encontrada`
            })
        }

    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la Calificacion con el id: ${id}`,
        });
    }
}

export const getAllUserCalificaciones = async (req, res) => {
    try{       
        const users = await User.find({}, {_id: 1});
        if(!users) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `No hay usuarios para mostrar calificaciones`
        })
        
        await Promise.all(getCalificaciones(users))
        .then(calificacion => {
            if(!calificacion) 
              return res.status(404).json({
                status: "notfound",
                message: `No hay calificaciones`
              })
            else {
                res.json({
                    data: calificacion,
                    status: "success",
                    message: `Las calificaciones fue encontrada`
                })
            }
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo las calificaciones`,
        });
    }
}

export const deleteCalificacion = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el _id del usuario temporaryuser"
        })
    const { id } = req.params;
    try{
        const dataCalificacion = await Calificacion.findByIdAndDelete(id)
        res.json({
            data: dataCalificacion,
            status: 'success',
            message: 'La Calificacion fue eliminada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado la Calificacion con el id: ${id}`,
        });
    }
}

export const updateCalificacion = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la calificacion"
        })
    if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar datos en el cuerpo para calificaciones"
        })
    const { id } = req.params;
    try{
        const updatedCalificacion = await Calificacion.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            data: updatedCalificacion,
            status: 'success',
            message: 'La Calificacion fue actualizado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'internalError',
            message: `Error actualizando la Calificacion con el id: ${id}`,
        });
    }  
}

const getCalificaciones = (users) => {
    const promises = users.map((user) => {
        return new Promise(function (resolve, reject) {
            Calificacion.find({ id_user: user._id }, function (err, doc) {
                if (err)
                    reject(err)
                resolve(doc)
            })
        });
    })
    return promises;
}
