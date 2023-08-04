import { Request, Response } from 'express';
import { Router } from 'express';
import controller from '../controllers/authController';
import { body } from 'express-validator';

/**
 * @swagger
 * tags:
 *   name: Auth controller
 *   description: The Auth API controller
 */
const router = Router();

router.get('/', (req: Request, res: Response) => res.sendStatus(200));

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Registration new user
 *     tags: [Auth controller]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: User
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Some server error
 *
 */
router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 5 }), controller.registration);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth controller]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: User
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description:  User daa.
 *       500:
 *         description: Some server error
 *
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth controller]
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 *       500:
 *         description: Some server error
 *
 */
router.get('/logout', controller.logout);

export default router;
