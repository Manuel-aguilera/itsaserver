import {Router} from 'express';

import * as descargasCtrl from '../controllers/descargas.controller';

const router = Router();

router.post('/', descargasCtrl.createDescarga);

router.get('/', descargasCtrl.findAllDescarga);

router.get('/:id', descargasCtrl.findUserDescargas);

router.get('/form', descargasCtrl.homeForm);

router.delete('/:id', descargasCtrl.deleteDescarga);

router.put('/:id', descargasCtrl.updateDescarga);

export default router;
