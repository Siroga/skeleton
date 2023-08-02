import { Request, Response } from 'express';
import { Router } from 'express';
import controller from '../controllers/tokenController';

const router = Router();

router.get('/', (req: Request, res: Response) => res.sendStatus(200));
router.get('/refresh', controller.refresh);
router.delete('/remove', controller.remove);

export default router;
