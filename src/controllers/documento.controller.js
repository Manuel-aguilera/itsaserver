import Documento from '../models/Documento';
import upload from '../middleware/upload';
import path from 'path';

export const homeForm = (req, res) => {
    return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

export const findAllDocumento = async (req, res) => {
    try{
        const data = await Documento.find();
        
        res.json({
            data: data,
            status: 'success',
            message: "Imagenes devueltas",
        });
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || "Algo ocurrió mal mientras devolviamos los Documentos",
        });
    }
}

//no olvides que este lo debemos llamar al momento de entrar al step3 para que exista el registro
// de documentos para el id_user actual de la app
export const createDocumento = async (req, res) => {
    //usar express-validator para validar
    try{
        //guardamos las ubicaciones de las imagenes en mongodb 
        console.log('id_user');
        console.log(req.body.id_user);
        if(!req.body)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del usuario"
        })
        const newDocumento = new Documento({
            id_user: req.body.id_user,     
        });
        
        const docs = await newDocumento.save();
        res.json({
            data: docs,
            status: 'success',
            message: 'Registro de documentos para el usuario creado exitosamente',
        })
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || "Algo ocurrió mal mientras creabamos un Documento",
        });
    }
}

// export const createDocumento = async (req, res) => {
//     //usar express-validator para validar
//     try{
//         await upload(req, res);
//         //esto
//         // console.log(req.files);
//         if (req.files.length < 1) {
//             return res.json({
//                 data: [],
//                 status: 'failed',
//                 message: 'Deberás envíar las dos imagenes',
//             });
//         }

//         //guardamos las ubicaciones de las imagenes en mongodb 
//         console.log('id_user');
//         console.log(req.body.id_user);
//         if(!req.body)
//         res.status(404).json({
//             data: [],
//             status: "failed",
//             message: "No has ingresado el id del usuario"
//         })
//         console.log('files');
//         console.log(req.files);

//         let file1 = req.files[0];
//         let file2 = req.files[1];
//         const newDocumento = [];
//         if(isActa(file1) && isCertificado(file2)){
//             console.log('entra a acta y certificado')
//             newDocumento.push(newDocumento.push(new Documento({
//                 id_user: req.body.id_user,
//                 actaFoto: {
//                     image: {
//                         originalname: getActa(req.files).originalname,
//                         filename: getActa(req.files).filename,
//                         path: getActa(req.files).path,
//                     }
//                 },
//                 certificadoBach: {
//                     image: {
//                         originalname: getCertificado(req.files).originalname,
//                         filename: getCertificado(req.files).filename,
//                         path: getCertificado(req.files).path,
//                     }
//                 },     
//             })));
//         }
//         else if(isConstancia(file1) && isCurp(file2)){
//             newDocumento.push(newDocumento.push(new Documento({
//                 id_user: req.body.id_user,
//                 curpFoto: {
//                     image: {
//                         originalname: getCurp(req.files).originalname,
//                         filename: getCurp(req.files).filename,
//                         path: getCurp(req.files).path,
//                     }
//                 },
//                 constanciaMedica: {
//                     image: {
//                         originalname: getConstancia(req.files).originalname,
//                         filename: getConstancia(req.files).filename,
//                         path: getConstancia(req.files).path,
//                     }
//                 }, 
//             })));
//         }
//         else {
//             res.json({
//                 data: [],
//                 status: 'failed',
//                 message: 'No enviaste las dos fotos o el nombre es incorrecto',
//             })    
//         }
        
//         const docs = await newDocumento[0].save();
//         res.json({
//             data: docs,
//             status: 'success',
//             message: 'Documentos guardados con éxito',
//         })
//     }
//     catch(error){
//         if (error.code === "LIMIT_UNEXPECTED_FILE") {
//             return res.status(404).json({
//                 data: [],
//                 status: 'failed',
//                 message: 'Demasiados archivos han sido enviados',
//             });
//         }
//         res.status(500).json({
//             data: [],
//             status: 'failed',
//             message: error.message || "Algo ocurrió mal mientras creabamos un Documento",
//         });
//     }
// }
//acta y certificado
//curp y constancia

const isActa = (file) => {
    const isActa = /acta/;
    return (isActa.test(file.originalname)) ? true : false
}

const isCertificado = (file) => {
    const isCertificado = /certificado/;
    return (isCertificado.test(file.originalname)) ? true : false
}

const isCurp = (file) => {
    const isCurp = /curp/;
    return (isCurp.test(file.originalname)) ? true : false
}

const isConstancia = (file) => {
    const isConstancia = /constancia/;
    return (isConstancia.test(file.originalname)) ? true : false
}

const getActa = (files) => {
    const isActa = /acta/;
    if(isActa.test(files[0].originalname))
        return files[0]
    else if(isActa.test(files[1].originalname))
        return files[1];
    console.log('acta es vacio')
}

const getCertificado = (files) => {
    const isCertificado = /certificado/;
    if(isCertificado.test(files[0].originalname))
        return files[0];
    else if(isCertificado.test(files[1].originalname))
        return files[1];
    console.log('certificado es vacio')
}

const getCurp = (files) => {
    const isCurp = /curp/;
    if(isCurp.test(files[0].originalname))
        return files[0];
    else if(isCurp.test(files[1].originalname))
        return files[1];
}

const getConstancia = (files) => {
    const isConstancia = /constancia/;
    if(isConstancia.test(files[0].originalname))
        return files[0];
    else if(isConstancia.test(files[1].originalname))
        return files[1];
}

export const findOneDocumento = async (req, res) => {
    const { id } = req.params;
    try{
        const documento = await Documento.findById(id);

        if(!documento) return res.status(404).json({
            data: [],
            status: 'notfound',
            message: `El Documento con el id: ${id} no existe`
        })

        res.json(documento)
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || `Error devolviendo el Documento con el id: ${id}`,
        });
    }
}

export const deleteDocumento = async (req, res) => {
    const { id } = req.params;
    try{
        await Documento.findByIdAndDelete(id)
        res.json({
            data: [],
            status: 'success',
            message: 'El Documento ha sido eliminada exitosamente'
        });
    }
    catch(error){
        res.status(500).json({
            data: [],
            status: 'failed',
            message: error.message || `Error eliminado el Documento con el id: ${id}`,
        });
    }
}

export const updateDocumento = async (req, res) => {
    try{
        await upload(req, res);
        if(req.files.length < 1) {
            return res.json({
                data: [],
                status: 'failed',
                message: 'Deberás enviar al menos una imagen',
            });
        }
        if(!req.query)
        res.status(404).json({
            data: [],
            status: "failed",
            message: "No has ingresado el id del documento a actualizar"
        })
        const { id } = req.query;
        const documentoId = await Documento.findOne({id_user: id});
        const id_doc = documentoId._id; //es el id del documento a actualizar
        let file1 = req.files[0];
        let file2 = req.files[1];
        let updatedDocumento = {};
        if(isActa(file1) && isCertificado(file2)){
            console.log(`entra a acta y certificado: actualizamos el documento con id: ${id_doc}`);
            updatedDocumento = await Documento.findByIdAndUpdate(id_doc, {
                actaFoto: {
                    image: {
                        originalname: getActa(req.files).originalname,
                        filename: getActa(req.files).filename,
                        path: getActa(req.files).path,
                    }
                },
                certificadoBach: {
                    image: {
                        originalname: getCertificado(req.files).originalname,
                        filename: getCertificado(req.files).filename,
                        path: getCertificado(req.files).path,
                    }
                },     
            }, {
                useFindAndModify: false
            });
        }
        else if( isCurp(file1) && isConstancia(file2)){
            console.log(`entra a curp y constancia: actualizamos el documento con id: ${id_doc}`);
            updatedDocumento = await Documento.findByIdAndUpdate(id_doc, {
                curpFoto: {
                    image: {
                        originalname: getCurp(req.files).originalname,
                        filename: getCurp(req.files).filename,
                        path: getCurp(req.files).path,
                    }
                },
                constanciaMedica: {
                    image: {
                        originalname: getConstancia(req.files).originalname,
                        filename: getConstancia(req.files).filename,
                        path: getConstancia(req.files).path,
                    }
                }, 
            });
        }
        else {
            res.json({
                data: [],
                status: 'failed',
                message: 'No enviaste las dos fotos o los nombres son incorrectos',
            })    
        }
        
        res.json({
            data: updatedDocumento,
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
            data: [],
            status: 'failed',
            message: error.message || `Error actualizando el Documento con el id: ${id}`,
        });
    }
}

