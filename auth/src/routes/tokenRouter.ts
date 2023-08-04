import { Request, Response } from 'express';
import { Router } from 'express';
import controller from '../controllers/tokenController';

/**
 * @swagger
 * tags:
 *   name: Token controller
 *   description: The Token API controller
 */
const router = Router();

router.get('/', (req: Request, res: Response) => res.sendStatus(200));

/**
 * @swagger
 * /token/refresh:
 *   post:
 *     summary: refresh user token in DB
 *     tags: [Token controller]
 *     responses:
 *       200:
 *         description: New token.
 *       500:
 *         description: Some server error
 *
 */
router.get('/refresh', controller.refresh);

/**
 * @swagger
 * /token/remove:
 *   post:
 *     summary: Remove user token from DB
 *     tags: [Token controller]
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Some server error
 *
 */
router.delete('/remove', controller.remove);

export default router;
