import {Router} from 'express';

import * as depositosBancarioCtrl from '../controllers/depositosbancario.controller';

const router = Router();

router.post('/', depositosBancarioCtrl.createDepositosBancario);

router.post('/alumno/', depositosBancarioCtrl.createAlumnoDepositosBancario);

router.get('/', depositosBancarioCtrl.findAllDepositosBancarios);

router.get('/noprocesados/:id', depositosBancarioCtrl.findAvailableDepositosBancario);

router.get('/nopagados/:id', depositosBancarioCtrl.findNotPaidDepositosBancario);

router.delete('/:id', depositosBancarioCtrl.deleteDepositosBancario);

router.put('/', depositosBancarioCtrl.updateDepositosBancario);

router.put('/:id', depositosBancarioCtrl.updateAvailableDepositosBancario);

router.put('/estadopago/:id', depositosBancarioCtrl.estadoPagoDepositosBancario);

router.put('/pagado/:id', depositosBancarioCtrl.pagadoDepositosBancario);

export default router;
