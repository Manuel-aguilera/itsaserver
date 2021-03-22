import DepositosBancario from '../models/DepositosBancario';

export const findAllDepositosBancario = async (req, res) => {
    try{
        const data = await DepositosBancario.find();
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los DepositosBancarios",
        });
    }
}

export const createDepositosBancario = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.tipoPago || !req.body.concepto || !req.body.cantidad || !req.body.costo
        || !req.body.importe || !req.body.NControlCurp || !req.body.folioInterno || !req.body.convenioCIE
        || !req.body.referenciaBancaria || !req.body.periodo || !req.body.fecha
        || !req.body.fechaCaducidad || !req.body.observaciones){
        return res.status(404).send({
            message: "tipoPago, concepto, cantidad, costo, importe, NControlCurp, folioInterno, convenioCIE, referenciaBancaria, periodo, fechaCaducidad y observaciones fecha no puede ser vacío en el body"
        })
    }
    try{
        const newDepositosBancario = new DepositosBancario({
            id_user: req.body.id_user,
            usuario: req.body.usuario,
            tipoPago: req.body.tipoPago,
            concepto: req.body.concepto,
            cantidad: req.body.cantidad,
            costo: req.body.costo,
            importe: req.body.importe,
            NControlCurp: req.body.NControlCurp,
            folioInterno: req.body.folioInterno,
            convenioCIE: req.body.convenioCIE,
            referenciaBancaria: req.body.referenciaBancaria,
            periodo: req.body.periodo,
            fecha: req.body.fecha,
            fechaCaducidad: req.body.fechaCaducidad,
            observaciones: req.body.observaciones,
        });
        const depositosBancarioSave = await newDepositosBancario.save();
        res.json(depositosBancarioSave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos un DepositosBancario",
        });
    }
}

export const findOneDepositosBancario = async (req, res) => {
    const { id } = req.params;
    try{
        const depositosBancario = await DepositosBancario.findById(id);

        if(!depositosBancario) return res.status(404).json({
            message: `El DepositosBancario con el id: ${id} no existe`
        })

        res.json(depositosBancario)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo el DepositosBancario con el id: ${id}`,
        });
    }
}

export const deleteDepositosBancario = async (req, res) => {
    const { id } = req.params;
    try{
        await DepositosBancario.findByIdAndDelete(id)
        res.json({
            message: 'El DepositosBancario ha sido eliminado exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado el DepositosBancario con el id: ${id}`,
        });
    }
}

export const updateDepositosBancario = async (req, res) => {
    const { id } = req.params;
    if(!req.body.concepto && !req.body.costo ){
        return res.status(404).send({
            message: "DepositosBancario no puede ser vacío en el body"
        })
    }
    try{
        const updatedDepositosBancario = await DepositosBancario.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'El DepositosBancario fue actualizado exitosamente',
            depositosBancario: updatedDepositosBancario
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el DepositosBancario con el id: ${id}`,
        });
    }
}

