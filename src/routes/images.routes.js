import {Router} from 'express';

import * as imagesCtrl from '../controllers/images.controller';

const router = Router();

// router.get('/', imagesCtrl.findAllPeriodos);

// router.get('/ultimo', imagesCtrl.findUltimoPeriodo);

router.get('/:id', imagesCtrl.getUpload);

export default router;

