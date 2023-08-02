import { Request, Response } from 'express';
import { Router } from 'express';
import controller from '../controllers/userController';

const router = Router();

router.get('/', (req: Request, res: Response) => res.sendStatus(200));
router.get('/getUser', controller.getUser);
router.delete('/remove', controller.remove);
router.get('/activate/:link', controller.activate);


export default router;
