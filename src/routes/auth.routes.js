import {Router} from 'express';

import * as userCtrl from '../controllers/auth.controller';
import * as verifySignup from '../middleware/verifySignup';


const router = Router();

router.post(
    '/signup', 
    [verifySignup.checkDuplicateUserAndEamil, verifySignup.checkRolesExisted],
    userCtrl.signup);

router.post(
    '/signin',
    [verifySignup.checkDuplicateUserAndEamil, verifySignup.checkRolesExisted], 
    userCtrl.signin);

// router.post('/nuevo', userCtrl.createNewUser); //para crear un usuario desde la tasks.http

// router.get('/', userCtrl.findAllUsers);

// router.get('/:id', userCtrl.findOneUser);

// router.delete('/:id', userCtrl.deleteUser);

// router.put('/', userCtrl.updateUser);

export default router;