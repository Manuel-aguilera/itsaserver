import util from 'util';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../uploadDepositosAlumno`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} es invalido solo se aceptan png/jpg/jpeg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-itsa-${file.originalname}`;
    callback(null, filename);
  }
});

const uploadFiles = multer({ storage: storage }).array("multi-files", 1);
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;