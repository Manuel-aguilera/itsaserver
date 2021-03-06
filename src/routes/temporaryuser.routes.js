import {Router} from 'express';

import * as userCtrl from '../controllers/temporaryuser.controller';

const router = Router();

router.post('/', userCtrl.createUser);

router.get('/todos/', userCtrl.getAlumnosInscripciones);

router.get('/', userCtrl.findOneUser);

router.get('/estadoInsc/', userCtrl.getEstadoInsc);

router.get('/temp/', userCtrl.getUserApp);

router.delete('/:id', userCtrl.deleteUser);

router.put('/', userCtrl.updateUser);

router.put('/:id', userCtrl.updateUser);

router.put('/estadoinscripcion/:id', userCtrl.updateEstadoInscripcion);
//No olvidar que /:id  no son los params de las peticiones  

export default router;