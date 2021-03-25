import DepositosBancario from '../models/DepositosBancario';

export const findAllDepositosBancarios = async (req, res) => {
    try{
        const data = await DepositosBancario.find();
        
        res.json({
            data: data,
            status: "success",
            message: "Datos de las DepositosBancarios"
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las DepositosBancarios",
        });
    }
}

export const createDepositosBancario = async (req, res) => {
    try{
        
        if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "Debes ingresar los datos del DepositosBancario"
        })
        
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
            DepositosBancario: req.body.DepositosBancario,
            fecha: req.body.fecha,
            fechaCaducidad: req.body.fechaCaducidad,
            observaciones: req.body.observaciones, 
            // fotoComprobante: req.files[0], no porque apenas se genera
        });
        const depositosBancarioSave = await newDepositosBancario.save();
        res.json({
            data: depositosBancarioSave,
            status: "success",
            message: "DepositosBancario creada exitosamente"
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: "failed",
            message: error.message || "Algo ocurrió mal mientras creabamos la DepositosBancario",
        });
    }
}

export const findOneDepositosBancario = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id de la DepositosBancario"
        })
    const { id } = req.params;
    try{
        const depositosBancario = await DepositosBancario.findById(id);

        if(!depositosBancario) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `La DepositosBancario con el id: ${id} no existe`
        })

        res.json({
            data: depositosBancario,
            status: "success",
            message: `La carreara fue encontrada`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la DepositosBancario con el id: ${id}`,
        });
    }
}

export const findUltimoDepositosBancario = async (req, res) => {
    try{
        const depositosBancario = await DepositosBancario.find({},{_id: 0}).sort({"createdAt":-1});

            if(!depositosBancario) return res.status(404).json({
            data: [],
            status: "notfound",
            message: `La DepositosBancario con el id: ${id} no existe`
        })

        res.json({
            data: depositosBancario,
            status: "success",
            message: `El DepositosBancario fue encontrado`
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo la DepositosBancario con el id: ${id}`,
        });
    }
}

export const deleteDepositosBancario = async (req, res) => {
    if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el _id del DepositosBancario temporaryuser"
        })
    const { id } = req.params;
    try{
        const dataDepositosBancario = await DepositosBancario.findByIdAndDelete(id)
        res.json({
            data: dataDepositosBancario,
            status: 'success',
            message: 'La DepositosBancario fue eliminada exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado la DepositosBancario con el id: ${id}`,
        });
    }
}

export const updateDepositosBancario = async (req, res) => {
    try{
        await upload(req, res);
        if(!req.params)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "No has ingresado el id del DepositosBancario"
            })
        if(!req.body)
            res.status(404).json({
                data: [],
                status: "failed",
                message: "Debes ingresar datos en el cuerpo del DepositosBancario"
            })
        if (!req.files) {
            return res.json({
                data: [],
                status: 'failed',
                message: 'Deberás envíar la foto de comprobante de pago para actualizar',
            });
        }
        const { id } = req.params;
        
        const updatedDepositosBancario = await DepositosBancario.findByIdAndUpdate(id, {
            ...req.body,
            fotoComprobante: req.files[0]
        }, {
            useFindAndModify: false
        });
        res.json({
            data: updatedDepositosBancario,
            status: 'success',
            message: 'La DepositosBancario fue actualizado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'internalError',
            message: `Error actualizando la DepositosBancario con el id: ${id}`,
        });
    }
}