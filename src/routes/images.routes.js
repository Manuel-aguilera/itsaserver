import {Router} from 'express';

import * as imagesCtrl from '../controllers/images.controller';

const router = Router();

// router.get('/', imagesCtrl.findAllPeriodos);

// router.get('/ultimo', imagesCtrl.findUltimoPeriodo);

router.get('/fotos/:id', imagesCtrl.getUpload);

router.get('/documentos/:id', imagesCtrl.getUploadFile);

router.get('/depositos/:id', imagesCtrl.getUploadDepositos);

export default router;

