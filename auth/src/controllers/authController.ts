import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/apiError';

class AuthController {
  constructor() {
    this.registration = this.registration.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json('');
    } catch (e) {
      next(e);
    }
  };
}

export default new AuthController();
