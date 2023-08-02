import { Request, Response } from 'express';
import { Router } from 'express';
import controller from '../controllers/authController';
import { body } from 'express-validator';

const router = Router();

router.get('/', (req: Request, res: Response) => res.sendStatus(200));
router.post('/registration', body('email').isEmail(), body('password').isLength({min: 5}), controller.registration);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

export default router;
