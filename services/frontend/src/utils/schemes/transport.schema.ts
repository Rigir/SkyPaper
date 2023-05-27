import { string, object, ObjectSchema, date, array, mixed } from 'yup';
import { ITransportForm } from '../interfaces/transport.interface.ts';
import { cargoSchema } from './cargo.schema.ts';

function isWeekend(date: Date): boolean {
    return [0, 6].includes(date.getDay());
}

export const transportSchema:ObjectSchema<ITransportForm> = object({
    shipping_from: string().required('Transport from is required'),
    shipping_to: string().required('Transport to is required'),
    aircraft_type: mixed<string | number>().required("Aircraft type is required"),
    shipping_documents: array<File>().optional(),
    transport_date: date().required('Transport date is required')
    .min(new Date().toISOString().split('T')[0], 'Date must be a future date')
    .test('is-not-weekend', 'Weekends are not allowed', (value) => !isWeekend(value)),
    cargos: array().of(cargoSchema).required().min(1, "At least one cargo must be added")
    .test('validate-cargo-weight', 'Cargo weight exceeds maximum payload weight of the selected aircraft type', (cargos, testContext) => {
        const selected_type_max_weight = parseInt(testContext.parent.aircraft_type);
        if(selected_type_max_weight){
            return !cargos.some(cargo => cargo.payload_weight_in_kg > selected_type_max_weight);
        }
    }),
   
});