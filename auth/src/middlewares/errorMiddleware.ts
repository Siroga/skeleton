import { NextFunction, Response, Request } from "express";
import ApiError from "../exceptions/apiError";
import log from "../logger";

export default function (err: ApiError, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ApiError){
        log.error(err.message);

        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    log.error('500 Error!!!');
    return res.status(500).json({message: '500 Error!!!'})
}