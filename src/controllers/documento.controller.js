import Documento from '../models/Documento';
import upload from '../middleware/upload';
import path from 'path';

export const homeForm = (req, res) => {
    return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

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
    try{
        // if(!req.body.id_user){
        //     return res.status(404).send({
        //         data: [],
        //         status: '',
        //         message: 'No se conoce el id_user por lo que no podemos guardar las imagenes',
        //     })
        // }
        await upload(req, res);
        //esto
        if (req.files.length < 1) {
            return res.json({
                data: req.files,
                status: '',
                message: 'Deberás envíar las dos imagenes',
            });
        }

        //guardamos las ubicaciones de las imagenes en mongodb 
        console.log('id_user');
        console.log(req.body.id_user);
        console.log('files');
        console.log(req.files);
<<<<<<< HEAD
        let newDocumento = [];  
=======
        let newDocumento = [];
>>>>>>> c70e51e98b0998feb33f08b78fb3863c6473397f
        req.files.forEach(file => {
            newDocumento.push(new Documento({
                id_user: req.body.id_user,
                curpFoto: {
                    image: {
                        originalname: file.originalname,
                        filename: file.filename,
                        path: file.path,
                    }
                },
                actaFoto: {
                    image: {
                        originalname: file.originalname,
                        filename: file.filename,
                        path: file.path,
                    }
                },
                certificadoBach: {
                    image: {
                        originalname: file.originalname,
                        filename: file.filename,
                        path: file.path,
                    }
                },
                constanciaMedica: {
                    image: {
                        originalname: file.originalname,
                        filename: file.filename,
                        path: file.path,
                    }
                }, 
            }));            
        });
        
        const doc1 = await newDocumento[0].save();
        const doc2 = await newDocumento[1].save();
        res.json({
            data: [doc1, doc2],
            status: 'success',
            message: 'Documentos guardados con éxito',
        })
    }
    catch(error){
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(404).json({
                data: [],
                status: 'failed',
                message: 'Demasiados archivos han sido enviados',
            });
        }
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

