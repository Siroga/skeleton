import { Request, Response } from 'express';
import { Router } from 'express';
import controller from '../controllers/mainController';

const router = Router();

router.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
router.get('/', controller.home);

export default router;
