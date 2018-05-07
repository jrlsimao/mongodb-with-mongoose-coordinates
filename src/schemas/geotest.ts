import {Document, Schema, Model, model} from 'mongoose';
import {PersonInterface} from '../interfaces/person-interface'

const GeoSchema = new Schema({
    type:{
        type: String,
        default: 'Point'
    },
    coordinates:{
      type:[Number,Number]
    }
});

const PersonSchema = new Schema({
    name:{
        type:String,
        required: [true, 'Name field is required']
    },
    age:{
        type:Number
    },
    geometry: {
        type:{
            String,
            default:'Point'
        },
        coordinates:{ 
            type:[Number],
            index:'2dsphere'
        }   
    }
});

PersonSchema.index({geometry:"2dsphere"});
export const Person = model<PersonInterface>("People", PersonSchema);