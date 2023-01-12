import {NextFunction, Response, Request} from 'express';
import { GenericObject } from '../controllers/Types';

export const response = (response: Error | GenericObject, req: Request, res: Response, next: NextFunction)=> {
    const result: {
      success: boolean,
      data?: GenericObject | GenericObject[],
      error?: string | GenericObject
    } = {
      success: true,
    };
    let httpCode = 200;
    if(response instanceof Error){
      result.success = false;
      if(response.message.includes('Validation Error')){
        result.error = JSON.parse(response.message);
        httpCode = 400;
      } else {
        result.error = response.message;
        httpCode = response.message === 'Not Found' ? 404 : 500;
      }
    } else {
      result.data = response;
      httpCode = 200;
    }
    res.status(httpCode).json(result);
}