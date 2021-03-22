import {Router} from 'express';

import * as carreraCtrl from '../controllers/carrera.controller';

const router = Router();

router.post('/', carreraCtrl.createCarrera);

router.get('/', carreraCtrl.findAllCarreras);

router.get('/:id', carreraCtrl.findOneCarrera);

router.delete('/:id', carreraCtrl.deleteCarrera);

router.put('/:id', carreraCtrl.updateCarrera);

export default router;