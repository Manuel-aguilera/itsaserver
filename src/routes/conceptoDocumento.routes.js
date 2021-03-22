import {Router} from 'express';

import * as conceptoDocumentoCtrl from '../controllers/conceptoDocumento.controller';

const router = Router();

router.post('/', conceptoDocumentoCtrl.createConceptoDocumento);

router.get('/', conceptoDocumentoCtrl.findAllConceptoDocumento);

router.get('/:id', conceptoDocumentoCtrl.findOneConceptoDocumento);

router.delete('/:id', conceptoDocumentoCtrl.deleteConceptoDocumento);

router.put('/:id', conceptoDocumentoCtrl.updateConceptoDocumento);

export default router;
