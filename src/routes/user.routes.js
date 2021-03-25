import {Router} from 'express';

import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.post('/', userCtrl.createUser);

router.post('/nuevo', userCtrl.createNewUser); //para crear un usuario desde la tasks.http

router.get('/', userCtrl.findAllUsers);

router.get('/:id', userCtrl.findOneUser);

router.delete('/:id', userCtrl.deleteUser);

router.put('/:id', userCtrl.updateUser);

export default router;