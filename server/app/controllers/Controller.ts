import {SchemaType, RouterType, ExtendedRequest, GenericRoute} from './Types';
import {NextFunction, Response} from 'express';

export class Controller<T extends GenericRoute>{
  readonly router: RouterType<T>;
  readonly schema: SchemaType<T>;
  constructor(router: RouterType<T>, schema: SchemaType<T>){
    this.router = router;
    this.schema = schema
  };

  validateRequest(req: ExtendedRequest){
    const schema = this.schema[req.handler];
    for(const part in schema){
        const {error, value} = schema[part].validate(req[part])
        if(error){
            throw new Error(JSON.stringify({name: 'Validation Error', details: error.details}));
        }
        Object.keys(value).forEach(key=>req[part][key] = value[key])
    }
  }
  async execute(req: ExtendedRequest, res: Response, next: NextFunction){
    try{
      this.validateRequest(req);
      const response = await this[req.handler](req, res);
      next(response);
    } catch (error){ 
      console.error('Error Handling ', error.message);
      next(error);
    }
  }
}