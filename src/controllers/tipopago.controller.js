import TipoPago from '../models/TipoPago';

export const findAllTipoPago = async (req, res) => {
    try{
        const data = await TipoPago.find();
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los TipoPago",
        });
    }
}

export const createTipoPago = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.tipoPago ){
        return res.status(404).send({
            message: "tipoPago no puede ser vacío en el body"
        })
    }
    try{
        const newTipoPago = new TipoPago({
            tipoPago: req.body.tipoPago, 
        });
        const tipoPagoSave = await newTipoPago.save();
        res.json(tipoPagoSave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos un tipoPago",
        });
    }
}

export const findOneTipoPago = async (req, res) => {
    const { id } = req.params;
    try{
        const tipoPago = await TipoPago.findById(id);

        if(!tipoPago) return res.status(404).json({
            message: `El tipoPago con el id: ${id} no existe`
        })

        res.json(tipoPago)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo el tipoPago con el id: ${id}`,
        });
    }
}

export const deleteTipoPago = async (req, res) => {
    const { id } = req.params;
    try{
        await TipoPago.findByIdAndDelete(id)
        res.json({
            message: 'El tipoPago ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado el tipoPago con el id: ${id}`,
        });
    }
}

export const updateTipoPago = async (req, res) => {
    const { id } = req.params;
    if(!req.body.tipoPago ){
        return res.status(404).send({
            message: "El tipoPago no puede ser vacío en el body"
        })
    }
    try{
        const updatedTipoPago = await TipoPago.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'El tipoPago fue actualizado exitosamente',
            tipoPago: updatedTipoPago
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el tipoPago con el id: ${id}`,
        });
    }
}

