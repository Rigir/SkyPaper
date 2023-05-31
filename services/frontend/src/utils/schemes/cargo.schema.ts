import { string, object, ObjectSchema, number } from 'yup';
import { ICargoDetails } from '../interfaces/cargo.interface.ts';

export const cargoSchema: ObjectSchema<ICargoDetails> = object({
    name: string().required('Name is required'),
    weight_in_kg: number().required('Weight is required')
        .positive('The cargo must have weight'),
    type: string().required('Type is required'),
});
