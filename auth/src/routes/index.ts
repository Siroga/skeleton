import { Router } from 'express';

import mainRouter from './mainRouter';
import authRouter from './authRouter';
import tokenRouter from './tokenRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/', mainRouter);
router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/user', userRouter);

export default router;

