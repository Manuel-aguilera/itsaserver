import {Router} from 'express';

import * as documentoCtrl from '../controllers/documento.controller';

const router = Router();

router.post('/', documentoCtrl.createDocumento);

router.get('/', documentoCtrl.findAllDocumento);

router.get('/form', documentoCtrl.homeForm);

router.get('/:id', documentoCtrl.findOneDocumento);

router.delete('/:id', documentoCtrl.deleteDocumento);

router.put('/:id', documentoCtrl.updateDocumento);

export default router;
