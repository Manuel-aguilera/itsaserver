import {Router} from 'express';

import * as periodoCtrl from '../controllers/periodo.controller';

const router = Router();

router.post('/', periodoCtrl.createPeriodo);

router.get('/', periodoCtrl.findAllPeriodo);

router.get('/:id', periodoCtrl.findOnePeriodo);

router.delete('/:id', periodoCtrl.deletePeriodo);

router.put('/:id', periodoCtrl.updatePeriodo);

export default router;
