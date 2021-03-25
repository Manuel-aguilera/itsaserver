import {Router} from 'express';

import * as descargasBancarioCtrl from '../controllers/descargas.controller';

const router = Router();

router.post('/', descargasBancarioCtrl.createDescarga);

router.get('/', descargasBancarioCtrl.findAllDescarga);

router.get('/:id', descargasBancarioCtrl.findOneDescarga);

router.delete('/:id', descargasBancarioCtrl.deleteDescarga);

router.put('/:id', descargasBancarioCtrl.updateDescarga);

export default router;
