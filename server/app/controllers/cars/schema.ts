import Joi from 'joi';
import { SchemaType } from '../Types';
import {Type} from './type';

export const Schema: SchemaType<Type> =  {
    findAll: {
        query: Joi.object().keys({
            'sort': Joi.string().default('id').description('Ключ сортировки'),
            'sortKind': Joi.string().valid('ASC', 'DESC').insensitive().default('ASC').description('Тип сортировки'),
            'id': Joi.number().positive().description('Идентификатор автомобиля'),
            'brand': Joi.string().min(1).max(255).description('Бренд автомобиля'),
            'name': Joi.string().min(1).max(255).description('Название автомобиля'),
            'prodYear': Joi.number().description('Год производства'),
            'price': Joi.number().positive().description('Цена'),
        })
    },
    create: {
        body: Joi.object().keys({
            'brand': Joi.string().min(1).max(255).required().description('Бренд автомобиля'),
            'name': Joi.string().min(1).max(255).required().description('Название автомобиля'),
            'prodYear': Joi.number().required().description('Год производства'),
            'price': Joi.number().positive().required().description('Цена'),
        })
    }, 
    delete: {
        params: Joi.object().keys({
            'id': Joi.number().positive().required().description('Идентификатор автомобиля'),
        }),
    },
}