import {Router} from 'express';

import * as depositosBancarioCtrl from '../controllers/depositosbancario.controller';

const router = Router();

router.post('/', depositosBancarioCtrl.createDepositosBancario);

router.get('/', depositosBancarioCtrl.findAllDepositosBancarios);

router.get('/:id', depositosBancarioCtrl.findOneDepositosBancario);

router.delete('/:id', depositosBancarioCtrl.deleteDepositosBancario);

router.put('/', depositosBancarioCtrl.updateDepositosBancario);

export default router;
