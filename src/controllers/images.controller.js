import path from 'path';

export const getUpload = async (req, res) => {
    try{
        const { id } = req.params;
        
        var options = {
            root: path.resolve('upload'),
        }
        res.sendFile(id, options);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las carreras",
        });
    }
}

export const getUploadFile = async (req, res) => {
    try{
        const { id } = req.params;
        
        var options = {
            root: path.resolve('uploadFile'),
        }
        res.sendFile(id, options);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las carreras",
        });
    }
}

export const getUploadDepositos = async (req, res) => {
    try{
        const { id } = req.params;
        
        var options = {
            root: path.resolve('uploadDepositos'),
        }
        res.sendFile(id, options);
    }
    catch(error){
        res.status(500).json({
            message: error.message || "Algo ocurrió mal mientras devolviamos las carreras",
        });
    }
}

// app.get('/user/:uid/photos/:file', function (req, res) {
//     var uid = req.params.uid
//     var file = req.params.file
  
//     req.user.mayViewFilesFrom(uid, function (yes) {
//       if (yes) {
//         res.sendFile('/uploads/' + uid + '/' + file)
//       } else {
//         res.status(  403).send("Sorry! You can't see that.")
//       }
//     })
// })
