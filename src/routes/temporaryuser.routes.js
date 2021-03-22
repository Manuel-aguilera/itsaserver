import {Router} from 'express';

import * as userCtrl from '../controllers/temporaryuser.controller';

const router = Router();

router.post('/', userCtrl.createUser);

router.get('/', userCtrl.findAllUsers);

router.get('/:id', userCtrl.findOneUser);

router.delete('/:id', userCtrl.deleteUser);

router.put('/:id', userCtrl.updateUser);

export default router;