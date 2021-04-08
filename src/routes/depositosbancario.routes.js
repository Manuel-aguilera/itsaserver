import {Router} from 'express';

import * as depositosBancarioCtrl from '../controllers/depositosbancario.controller';

const router = Router();

router.post('/', depositosBancarioCtrl.createDepositosBancario);

router.get('/', depositosBancarioCtrl.findAllDepositosBancarios);

router.get('/noprocesados/:id', depositosBancarioCtrl.findAvailableDepositosBancario);

router.get('/nopagados/:id', depositosBancarioCtrl.findNotPaidDepositosBancario);

router.delete('/:id', depositosBancarioCtrl.deleteDepositosBancario);

router.put('/', depositosBancarioCtrl.updateDepositosBancario);

router.put('/:id', depositosBancarioCtrl.updateAvailableDepositosBancario);

export default router;
