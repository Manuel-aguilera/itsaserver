import Periodo from '../models/Periodo';

export const findAllPeriodos = async (req, res) => {
    try{
        const data = await Periodo.find();
        
        res.json({
            data: data,
            status: "success",
            message: "Datos de las Periodos"
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las Periodos",
        });
    }
}

export const createPeriodo = async (req, res) => {
    //usar express-validator para validar
    try{
        if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar los datos del Periodo"
        })
        const newPeriodo = new Periodo({
            periodo: req.body.periodo, 
        });
        const PeriodoSave = await newPeriodo.save();
        res.json({
            data: PeriodoSave,
            status: "success",
            message: "Periodo creada exitosamente"
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos la Periodo",
        });
    }
}

export const findOnePeriodo = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la Periodo"
        })
    const { id } = req.params;
    try{
        const periodo = await Periodo.findById(id);

        if(!periodo) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `La Periodo con el id: ${id} no existe`
        })

        res.json({
            data: periodo,
            status: "success",
            message: `La carreara fue encontrada`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la Periodo con el id: ${id}`,
        });
    }
}

export const findUltimoPeriodo = async (req, res) => {
    try{
        const periodo = await Periodo.find({},{_id: 0}).sort({"periodo":-1});

        if(!periodo) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `La Periodo con el id: ${id} no existe`
        })

        res.json({
            data: periodo,
            status: "success",
            message: `El periodo fue encontrado`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la Periodo con el id: ${id}`,
        });
    }
}

export const deletePeriodo = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el _id del periodo temporaryuser"
        })
    const { id } = req.params;
    try{
        const dataPeriodo = await Periodo.findByIdAndDelete(id)
        res.json({
            data: dataPeriodo,
            status: 'success',
            message: 'La Periodo fue eliminada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado la Periodo con el id: ${id}`,
        });
    }
}

export const updatePeriodo = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del periodo"
        })
    if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar datos en el cuerpo del periodo"
        })
    const { id } = req.params;
    try{
        const updatedPeriodo = await Periodo.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            data: updatedPeriodo,
            status: 'success',
            message: 'La Periodo fue actualizado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'internalError',
            message: `Error actualizando la Periodo con el id: ${id}`,
        });
    }
}

