import {NextFunction, RequestHandler, Response} from 'express';
import {ObjectSchema} from 'joi'

export type GenericObject = {
  [key: string]: any
}

export interface ExtendedRequest<
  ReqParam = GenericObject, 
  ReqBody = GenericObject, 
  ReqQuery = GenericObject,
> extends RequestHandler{
  body: ReqBody;
  params: ReqParam;
  query: ReqQuery;
  handler: string,
}
export interface RouteInterface<T = any> {
    body?: T;
    params?: T;
    query?: T;
}

export type RouteRequest<T extends RouteInterface> = ExtendedRequest<T['params'], T['body'], T['query']>; 

export type ControllerMethods<T> = {
    [key in keyof T]: (
        req: RouteRequest<T[key]>,
        res: Response,
        next: NextFunction
    ) => Promise<void | GenericObject>;
}

export type SchemaType<T> = {
    [key in keyof T]: {
        [key2 in keyof T[key]]: ObjectSchema
    };
};

export type RouterType<T> = {
    generalPath: string, 
    routes: {
        [key in keyof T]: {
            path: string,
            method: string,
        }
    }
}