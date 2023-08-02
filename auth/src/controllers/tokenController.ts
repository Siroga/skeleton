import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import tokenService from '../service/token-service';

class TokenController {
  constructor() {
    this.refresh = this.refresh.bind(this);
    this.remove = this.remove.bind(this);
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json(userData);
    } catch (e) {}
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      tokenService.removeToken(refreshToken);

      res.status(200);
    } catch (e) {
      next(e);
    }
  };
}

export default new TokenController();
