import Periodo from '../models/Periodo';

export const findAllPeriodo = async (req, res) => {
    try{
        const data = await Periodo.find();
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los Periodo",
        });
    }
}

export const createPeriodo = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.periodo ){
        return res.status(404).send({
            message: "Periodo no puede ser vacío en el body"
        })
    }
    try{
        const newPeriodo = new Periodo({
            periodo: req.body.periodo, 
        });
        const periodoSave = await newPeriodo.save();
        res.json(periodoSave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos un Periodo",
        });
    }
}

export const findOnePeriodo = async (req, res) => {
    const { id } = req.params;
    try{
        const periodo = await Periodo.findById(id);

        if(!periodo) return res.status(404).json({
            message: `El Periodo con el id: ${id} no existe`
        })

        res.json(periodo)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo el Periodo con el id: ${id}`,
        });
    }
}

export const deletePeriodo = async (req, res) => {
    const { id } = req.params;
    try{
        await Periodo.findByIdAndDelete(id)
        res.json({
            message: 'El Periodo ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado el Periodo con el id: ${id}`,
        });
    }
}

export const updatePeriodo = async (req, res) => {
    const { id } = req.params;
    if(!req.body.periodo ){
        return res.status(404).send({
            message: "El Periodo no puede ser vacío en el body"
        })
    }
    try{
        const updatedPeriodo = await Periodo.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'El Periodo fue actualizado exitosamente',
            periodo: updatedPeriodo
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el Periodo con el id: ${id}`,
        });
    }
}

