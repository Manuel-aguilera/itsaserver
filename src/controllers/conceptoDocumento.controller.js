import ConceptoDocumento from '../models/ConceptoDocumento';

export const findAllConceptoDocumento = async (req, res) => {
    try{
        const data = await ConceptoDocumento.find();
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los ConceptoDocumentos",
        });
    }
}

export const createConceptoDocumento = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.concepto || !req.body.costo ){
        return res.status(404).send({
            message: "Concepto y costo no puede ser vacío en el body"
        })
    }
    try{
        const newConceptoDocumento = new ConceptoDocumento({
            concepto: req.body.concepto,
            costo: req.body.costo,
        });
        const conceptoDocumentoSave = await newConceptoDocumento.save();
        res.json(conceptoDocumentoSave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos un ConceptoDocumento",
        });
    }
}

export const findOneConceptoDocumento = async (req, res) => {
    const { id } = req.params;
    try{
        const conceptoDocumento = await ConceptoDocumento.findById(id);

        if(!conceptoDocumento) return res.status(404).json({
            message: `El ConceptoDocumento con el id: ${id} no existe`
        })

        res.json(conceptoDocumento)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo el ConceptoDocumento con el id: ${id}`,
        });
    }
}

export const deleteConceptoDocumento = async (req, res) => {
    const { id } = req.params;
    try{
        await ConceptoDocumento.findByIdAndDelete(id)
        res.json({
            message: 'El ConceptoDocumento ha sido eliminado exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado el ConceptoDocumento con el id: ${id}`,
        });
    }
}

export const updateConceptoDocumento = async (req, res) => {
    const { id } = req.params;
    if(!req.body.concepto && !req.body.costo ){
        return res.status(404).send({
            message: "ConceptoDocumento no puede ser vacío en el body"
        })
    }
    try{
        const updatedConceptoDocumento = await ConceptoDocumento.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'El ConceptoDocumento fue actualizado exitosamente',
            conceptoDocumento: updatedConceptoDocumento
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el ConceptoDocumento con el id: ${id}`,
        });
    }
}

