import Documento from '../models/Documento';

export const findAllDocumento = async (req, res) => {
    try{
        const data = await Documento.find();
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los Documentos",
        });
    }
}

export const createDocumento = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.curpFoto || !req.body.actaFoto || !req.body.certificadoBach || !req.body.constanciaMedica ){
        return res.status(404).send({
            message: "Curp, acta, certificado y contancia médica no puede ser vacío en el body"
        })
    }
    try{
        const newDocumento = new Documento({
            curpFoto: req.body.curpFoto,
            actaFoto: req.body.actaFoto,
            certificadoBach: req.body.certificadoBach,
            constanciaMedica: req.body.constanciaMedica, 
        });
        const documentoSave = await newDocumento.save();
        res.json(documentoSave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos un Documento",
        });
    }
}

export const findOneDocumento = async (req, res) => {
    const { id } = req.params;
    try{
        const documento = await Documento.findById(id);

        if(!documento) return res.status(404).json({
            message: `El Documento con el id: ${id} no existe`
        })

        res.json(documento)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo el Documento con el id: ${id}`,
        });
    }
}

export const deleteDocumento = async (req, res) => {
    const { id } = req.params;
    try{
        await Documento.findByIdAndDelete(id)
        res.json({
            message: 'El Documento ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado el Documento con el id: ${id}`,
        });
    }
}

export const updateDocumento = async (req, res) => {
    const { id } = req.params;
    if(!req.body.curpFoto && !req.body.actaFoto && !req.body.certificadoBach && !req.body.constanciaMedica ){
        return res.status(404).send({
            message: "Curp, acta, certificado y contancia médica no puede ser vacío en el body"
        })
    }
    try{
        const updatedDocumento = await Documento.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'El Documento fue actualizado exitosamente',
            documento: updatedDocumento
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el Documento con el id: ${id}`,
        });
    }
}

