import util from 'util';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../uploadFile`));
  },
  filename: (req, file, callback) => {
    const match = ["application/pdf"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> es invalido solo se aceptan pdf.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-itsa-${file.originalname}`;
    callback(null, filename);
  }
});

const uploadFiles = multer({ storage: storage }).array("multi-files", 1);
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;