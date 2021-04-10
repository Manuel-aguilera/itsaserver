import TipoPago from '../models/TipoPago';

export const findAllTipoPagos = async (req, res) => {
    try{
        const data = await TipoPago.find({}, {_id: 0, createdAt: 0, updatedAt: 0});
        
        res.json({
            data: data,
            status: "success",
            message: "Datos de las TipoPagos"
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las TipoPagos",
        });
    }
}

export const createTipoPago = async (req, res) => {
    //usar express-validator para validar
    try{
        if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar los datos del TipoPago"
        })
        const newTipoPago = new TipoPago({
            fichas: req.body.fichas, 
            inscripcion: req.body.inscripcion,
            reinscripcion: req.body.reinscripcion,
            constanciasKardex: req.body.constanciasKardex, 
            tramitesEgreso: req.body.tramitesEgreso,
            titulacion: req.body.titulacion,
            ingles: req.body.ingles,
        });
        const TipoPagoSave = await newTipoPago.save();
        res.json({
            data: TipoPagoSave,
            status: "success",
            message: "TipoPago creada exitosamente"
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos la TipoPago",
        });
    }
}

export const findOneTipoPago = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la TipoPago"
        })
    const { id } = req.params;
    try{
        const TipoPago = await TipoPago.findById(id);

        if(!TipoPago) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `El TipoPago con el id: ${id} no existe`
        })

        res.json({
            data: TipoPago,
            status: "success",
            message: `El tipoPago fue encontrada`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la TipoPago con el id: ${id}`,
        });
    }
}

export const deleteTipoPago = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el _id del usuario temporaryuser"
        })
    const { id } = req.params;
    try{
        const dataTipoPago = await TipoPago.findByIdAndDelete(id)
        res.json({
            data: dataTipoPago,
            status: 'success',
            message: 'La TipoPago fue eliminada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado la TipoPago con el id: ${id}`,
        });
    }
}

export const updateTipoPago = async (req, res) => {
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
        const updatedTipoPago = await TipoPago.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            data: updatedTipoPago,
            status: 'success',
            message: 'La TipoPago fue actualizado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'internalError',
            message: `Error actualizando la TipoPago con el id: ${id}`,
        });
    }
}

