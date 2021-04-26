import Descarga from '../models/Descarga';
import uploadFiles from '../middleware/uploadDescargas';
import path from 'path';

export const homeForm = (req, res) => {
    return res.sendFile(path.join(`${__dirname}/../views/formDes.html`));
};

export const findAllDescarga = async (req, res) => {
    try{
        const data = await Descarga.find();
        
        res.json({
            data: data,
            status: 'success',
            message: "Archivos devueltos",
        });
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || "Algo ocurrió mal mientras devolviamos los Descargas",
        });
    }
}

export const createDescarga = async (req, res) => {
    //usar express-validator para validar
    try{
        if(!req.body){
            return res.status(404).send({
                data: [],
                status: '',
                message: 'No hay informacion',
            })
        }
        await uploadFiles(req, res);
        
        if (req.files.length === 0 || req.files.length > 1) {
            return res.json({
                data: [],
                status: 'failed',
                message: 'Solo puedes enviar un archivo pdf',
            });
        }

        //guardamos las ubicaciones de las imagenes en mongodb 
        console.log('files');
        console.log(req.files);
        let newDescarga = [];  
        req.files.forEach(file => {
            newDescarga.push(new Descarga({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                archivo: {
                    originalname: file.originalname,
                    filename: file.filename,
                    path: file.path,
                } 
            }));            
        });
        
        const doc1 = await newDescarga[0].save();
        res.json({
            data: [doc1],
            status: 'success',
            message: 'Descargas guardados con éxito',
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
            data: [],
            status: 'failed',
            message: error.message || "Algo ocurrió mal mientras creabamos un Descarga",
        });
    }
}

export const findUserDescargas = async (req, res) => {
    try{
        if(!req.params)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id para las descargas"
        })
        const { id } = req.params;
        const descarga = await Descarga.find({id_user: id});

        if(descarga.length < 1) return res.status(404).json({
            data: [],
            status: 'notfound',
            message: `No hay descargas para el usuario con el id: ${id}`
        })

        res.json({
            data: descarga,
            status: 'success',
            message: `Archivos devueltos`
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || `Error devolviendo el Descarga con el id: ${id}`,
        });
    }
}

export const deleteDescarga = async (req, res) => {
    try{
        if(!req.params){
            return res.status(404).send({
                data: [],
                status: '',
                message: 'No hay informacion',
            })
        }
        const { id } = req.params;

        await Descarga.findByIdAndDelete(id)
        res.json({
            data: [],
            status: 'success',
            message: 'El Descarga ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || `Error eliminado el Descarga con el id: ${id}`,
        });
    }
}

export const updateDescarga = async (req, res) => {
    try{
        if(!req.params){
            return res.send({
                data: [],
                status: 'failed',
                message: "Nos ingresdo el id para la descarga a actualizar"
            })
        }
        const { id } = req.params;
        const updatedDescarga = await Descarga.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        });
        res.json({
            data: updatedDescarga,
            status: 'success',
            message: 'El Descarga fue actualizado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error actualizando el Descarga con el id: ${id}`,
        });
    }
}

