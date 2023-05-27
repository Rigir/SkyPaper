import { string, object, ObjectSchema, number} from 'yup';
import { ICargoDetails } from '../interfaces/cargo.interface.ts';

export const cargoSchema:ObjectSchema<ICargoDetails> = object({
    name: string().required('Cargo name is required'),
    weight_in_kg: number().required('Weight is required')
    .positive('Weight must be a positive number'),
    type: string().required('Cargo type is required'),
});
