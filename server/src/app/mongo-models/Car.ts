import {Schema, model, createConnection} from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import { config } from '../config';

const schema = new Schema({ 
  id: { type: Number, unique: true },
  brand: { type: String, min:1, max: 255, required: true },
  name: { type: String, min:1, max: 255, required: true },
  prodYear: { type: Number, required: true },
  price: { type: Number, required: true },
});

const AutoIncrement = AutoIncrementFactory(createConnection(config.MONGO_URL))
schema.plugin(AutoIncrement, {inc_field: 'id', start_seq: 1});

export const carsProjection = { 
  __v: false,
  _id: false
};

export const Car = model('cars', schema);