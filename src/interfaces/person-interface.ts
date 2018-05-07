import {Document, Collection} from 'mongoose';
import * as geojson from 'geojson';
import { GeoNearOptions } from 'mongodb';
export interface PersonInterface extends Document {
    name: String;
    age?: Number;
    geometry:{
        type:String,
        coordinates: [Number]
    }
}