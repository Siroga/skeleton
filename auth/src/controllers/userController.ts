import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import log from '../logger';

class UserController {
  constructor() {
    this.getUser = this.getUser.bind(this);
    this.remove = this.remove.bind(this);
    this.activate = this.activate.bind(this);
  }

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json('OK');
    }
    catch (e){
      next(e);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json('OK');
    }
    catch (e){
      next(e);
    }
  };

  activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      res.status(200);
      //TODO res.redirect(toHomePage)
    }
    catch (e) {
      next(e);
    }
    
  };
}

export default new UserController();

