import {Router} from 'express';

import * as convenioCIECtrl from '../controllers/convenioCIE.controller';

const router = Router();

router.post('/', convenioCIECtrl.createConvenioCIE);

router.get('/', convenioCIECtrl.findAllConvenioCIE);

router.get('/:id', convenioCIECtrl.findOneConvenioCIE);

router.delete('/:id', convenioCIECtrl.deleteConvenioCIE);

router.put('/:id', convenioCIECtrl.updateConvenioCIE);

export default router;
