import {NextFunction, Router} from 'express';
import { ExtendedRequest } from './controllers/Types';

export class Routers {
  controllers = {};
  routers: Router[] = [];

  constructor(controllers){
    this.controllers = controllers;
    this.init();
  }
  init(){
    for(const controllerKey in this.controllers){
      const router = Router();
      const controller = this.controllers[controllerKey];
      const {router: {generalPath, routes}} = controller;
      const execute = controller.execute.bind(controller);
      for(const handler in routes){
        const {method, path} = routes[handler];
        const setHandlerMiddleware = (req: ExtendedRequest, res: Response, next: NextFunction)=>{
          req.handler = handler; 
          next()
        };
        router[method](generalPath + path,setHandlerMiddleware, execute);
      }
      this.routers.push(router);
    }
  } 
};