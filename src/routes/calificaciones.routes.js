import {Router} from 'express';

import * as califCtrl from '../controllers/calificaciones.controller';

const router = Router();

router.post('/', califCtrl.createCalificacion);

router.get('/', califCtrl.getUserCalificaciones);

router.get('/todas/', califCtrl.getAllUserCalificaciones);

router.delete('/:id', califCtrl.deleteCalificacion);

router.put('/:id', califCtrl.updateCalificacion);

export default router;