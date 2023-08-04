import { Request, Response } from 'express';
import { Router } from 'express';
import controller from '../controllers/mainController';

/**
 * @swagger
 * tags:
 *   name: Main controller
 *   description: The Main API controller
 */
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Main controller
 *   description: The Main API controller
 * /healthcheck:
 *      get:
 *          summary: healthcheck
 *          tags: [Main controller]
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

/**
 * @swagger
 * /:
 *      get:
 *          summary: Test page
 *          tags: [Main controller]
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/', controller.home);

export default router;
