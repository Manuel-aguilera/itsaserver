import Carrera from '../models/Carrera';

export const findAllCarreras = async (req, res) => {
    try{
        const data = await Carrera.find();
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las carreras",
        });
    }
}

export const createCarrera = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.carrera || !req.body.planEstudios ){
        return res.status(404).send({
            message: "Carrera o plan de estudios no puede ser vacío en el body"
        })
    }
    try{
        const newCarrera = new Carrera({
            carrera: req.body.carrera, 
            planEstudios: req.body.planEstudios,
        });
        const carreraSave = await newCarrera.save();
        res.json(carreraSave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos la carrera",
        });
    }
}

export const findOneCarrera = async (req, res) => {
    const { id } = req.params;
    try{
        const carrera = await Carrera.findById(id);

        if(!carrera) return res.status(404).json({
            message: `La carrera con el id: ${id} no existe`
        })

        res.json(carrera)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la carrera con el id: ${id}`,
        });
    }
}

export const deleteCarrera = async (req, res) => {
    const { id } = req.params;
    try{
        await Carrera.findByIdAndDelete(id)
        res.json({
            message: 'La carrera ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado la carrera con el id: ${id}`,
        });
    }
}

export const updateCarrera = async (req, res) => {
    const { id } = req.params;
    if(!req.body.carrera && !req.body.planEstudios){
        return res.status(404).send({
            message: "La carrera o plan de estudios no puede ser vacío en el body"
        })
    }
    try{
        const updatedCarrera = await Carrera.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'La carrera fue actualizada exitosamente',
            carrera: updatedCarrera
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando la carrera con el id: ${id}`,
        });
    }
}

