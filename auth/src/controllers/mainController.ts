import { Request, Response, NextFunction } from 'express';

class MainController {
    constructor() {
        this.home = this.home.bind(this);
    }

    home = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json('OK');
          }
          catch (e){
            next(e);
          }
    };
}

export default new MainController();

