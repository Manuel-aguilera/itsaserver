import {Router} from 'express';
import * as depositosBancarioCtrl from '../controllers/depositosbancario.controller';
import * as authJwt from '../middleware/authJwt';

const router = Router();

//App movil

router.post('/alumno/', depositosBancarioCtrl.createAlumnoDepositosBancario);

router.get('/alumno/noprocesados/:id', depositosBancarioCtrl.findAvailableDepositosBancario);

router.get('/alumno/nopagados/:id', depositosBancarioCtrl.findNotPaidDepositosBancario);

router.put('/alumno/', depositosBancarioCtrl.updateDepositosBancario);

//Web

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], depositosBancarioCtrl.createDepositosBancario);

router.get('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], depositosBancarioCtrl.findAllDepositosBancarios);

router.put('/procesado/:id', [authJwt.verifyToken, authJwt.isAdmin], depositosBancarioCtrl.updateProcesadoDepositosBancario);

router.put('/estadopago/:id', [authJwt.verifyToken, authJwt.isAdmin], depositosBancarioCtrl.estadoPagoDepositosBancario);

router.put('/pagado/:id', [authJwt.verifyToken, authJwt.isAdmin], depositosBancarioCtrl.pagadoDepositosBancario);

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], depositosBancarioCtrl.deleteDepositosBancario);

export default router;
