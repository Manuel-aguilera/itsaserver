import ConvenioCIE from '../models/ConvenioCIE';

export const findAllConvenioCIE = async (req, res) => {
    try{
        const data = await ConvenioCIE.find();
        
        res.json(data);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos los ConvenioCIEs",
        });
    }
}

export const createConvenioCIE = async (req, res) => {
    //usar express-validator para validar
    if(!req.body.convenioCIE ){
        return res.status(404).send({
            message: "ConvenioCIE no puede ser vacío en el body"
        })
    }
    try{
        const newConvenioCIE = new ConvenioCIE({
            convenioCIE: req.body.convenioCIE,
        });
        const convenioCIESave = await newConvenioCIE.save();
        res.json(convenioCIESave)
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras creabamos un ConvenioCIE",
        });
    }
}

export const findOneConvenioCIE = async (req, res) => {
    const { id } = req.params;
    try{
        const convenioCIE = await ConvenioCIE.findById(id);

        if(!convenioCIE) return res.status(404).json({
            message: `El ConvenioCIE con el id: ${id} no existe`
        })

        res.json(convenioCIE)
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error devolviendo el ConvenioCIE con el id: ${id}`,
        });
    }
}

export const deleteConvenioCIE = async (req, res) => {
    const { id } = req.params;
    try{
        await ConvenioCIE.findByIdAndDelete(id)
        res.json({
            message: 'El ConvenioCIE ha sido eliminado exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error eliminado el ConvenioCIE con el id: ${id}`,
        });
    }
}

export const updateConvenioCIE = async (req, res) => {
    const { id } = req.params;
    if(!req.body.convenioCIE ){
        return res.status(404).send({
            message: "ConvenioCIE no puede ser vacío en el body"
        })
    }
    try{
        const updatedConvenioCIE = await ConvenioCIE.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            message: 'El ConvenioCIE fue actualizado exitosamente',
            convenioCIE: updatedConvenioCIE
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el ConvenioCIE con el id: ${id}`,
        });
    }
}

