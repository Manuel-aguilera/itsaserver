import util from 'util';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    // console.log("###########################################")
    // console.log(file)
    // console.log("###########################################")
    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> es invalido solo se aceptan png/jpg/jpeg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-itsa-${file.originalname}`;
    callback(null, filename);
  }
});

const uploadFiles = multer({ storage: storage }).array("multi-files", 2);
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;