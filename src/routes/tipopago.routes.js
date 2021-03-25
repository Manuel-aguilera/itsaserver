import {Router} from 'express';

import * as tipopagoCtrl from '../controllers/tipopago.controller';

const router = Router();

router.post('/', tipopagoCtrl.createTipoPago);

router.get('/', tipopagoCtrl.findAllTipoPagos);

router.get('/:id', tipopagoCtrl.findOneTipoPago);

router.delete('/:id', tipopagoCtrl.deleteTipoPago);

router.put('/:id', tipopagoCtrl.updateTipoPago);

export default router;