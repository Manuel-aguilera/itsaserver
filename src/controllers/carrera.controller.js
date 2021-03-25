import Carrera from '../models/Carrera';

export const findAllCarreras = async (req, res) => {
    try{
        const data = await Carrera.find();
        
        res.json({
            data: data,
            status: "success",
            message: "Datos de las carreras"
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las carreras",
        });
    }
}

export const createCarrera = async (req, res) => {
    //usar express-validator para validar
    try{
        if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar los datos de la carrera"
        })
        const newCarrera = new Carrera({
            carrera: req.body.carrera, 
            planEstudios: req.body.planEstudios,
            codigoCarrera: req.body.codigoCarrera,
        });
        const carreraSave = await newCarrera.save();
        res.json({
            data: carreraSave,
            status: "success",
            message: "carrera creada exitosamente"
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos la carrera",
        });
    }
}

export const findOneCarrera = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la carrera"
        })
    const { id } = req.params;
    try{
        const carrera = await Carrera.findById(id);

        if(!carrera) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `La carrera con el id: ${id} no existe`
        })

        res.json({
            data: carrera,
            status: "success",
            message: `La carreara fue encontrada`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la carrera con el id: ${id}`,
        });
    }
}

export const deleteCarrera = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el _id del usuario temporaryuser"
        })
    const { id } = req.params;
    try{
        const dataCarrera = await Carrera.findByIdAndDelete(id)
        res.json({
            data: dataCarrera,
            status: 'success',
            message: 'La carrera fue eliminada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado la carrera con el id: ${id}`,
        });
    }
}

export const updateCarrera = async (req, res) => {
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
        const updatedCarrera = await Carrera.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            data: updatedCarrera,
            status: 'success',
            message: 'La carrera fue actualizado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'internalError',
            message: `Error actualizando la carrera con el id: ${id}`,
        });
    }
}

