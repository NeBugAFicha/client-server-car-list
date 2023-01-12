import { RouterType } from '../Types';
import {Type} from './type';

export const Router: RouterType<Type> = {
  generalPath: '',
  routes: {
    findAll: {
        method: 'get',
        path: '/'
    },
    create: {
        method: 'post',
        path: '/'
    },
    delete: {
        method: 'delete',
        path: '/:id'
    },
  }
}