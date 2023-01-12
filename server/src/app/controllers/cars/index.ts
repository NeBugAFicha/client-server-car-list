import { ControllerMethods } from '../Types';
import { Type } from './type';
import {Controller} from '../Controller';
import { Router } from './router';
import { Schema } from './schema';
import { Car, carsProjection } from '../../mongo-models/Car';

type Methods = ControllerMethods<Type>;
class Cars extends Controller<Type> implements Methods{
    constructor(){
        super(Router, Schema);
    }
    
    create: Methods['create'] = async (req)=>{
        const {brand, name, prodYear, price}  = req.body;
        const result = await Car.create({brand, name, prodYear, price});
        return result;
    }

    findAll: Methods['findAll'] = async (req)=>{
        const {sort, sortKind, ...filter} = req.query;
        const result = await Car.find(
            filter, 
            carsProjection,
            { sort: { [sort] : sortKind === 'ASC' ? 1 : -1 } }
        );
        return result;
    }

    delete: Methods['delete'] = async (req)=>{
        const {id} = req.params;
        const result = await Car.findOneAndDelete({id});
        return result;
    }
}

export const cars = new Cars();