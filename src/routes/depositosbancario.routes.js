import {Router} from 'express';
import * as depositosBancarioCtrl from '../controllers/depositosbancario.controller';
import * as authJwt from '../middleware/authJwt';

const router = Router();

//App movil

router.post('/alumno/', depositosBancarioCtrl.createAlumnoDepositosBancario);

router.get('/alumno/:id', depositosBancarioCtrl.findAllDepositosBancarioAlumno);

router.get('/alumno/noprocesados/:id', depositosBancarioCtrl.findNoProcesadoDepositosBancario);

router.get('/alumno/nopagados/:id', depositosBancarioCtrl.findNotPaidDepositosBancario);

router.put('/alumno/', depositosBancarioCtrl.updateDepositosBancario);

//Web
// quitamos los comprobadores de token y de tipo de sesion porque aún no arreglamos las sesiones

router.post('/', depositosBancarioCtrl.createDepositosBancario);

router.get('/', depositosBancarioCtrl.findAllDepositosBancarios);

router.put('/procesado/:id', depositosBancarioCtrl.updateProcesadoDepositosBancario);

router.put('/estadopago/:id', depositosBancarioCtrl.updateEstadoPagoDepositosBancario);

router.put('/pagado/:id', depositosBancarioCtrl.updatePagadoDepositosBancario);

router.delete('/:id', depositosBancarioCtrl.deleteDepositosBancario);

export default router;
